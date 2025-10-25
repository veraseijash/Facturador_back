import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data_primer_nivel } from './data_primer_nivel.entity';
import { Repository } from 'typeorm';
import { CreateDataPrimerNiveDto } from './dto/create-data_primer_nivel.dto';
import { UpdateDataPrimerNiveDto } from './dto/update-data_primer_nivel.dto';
import { DataSegundoNivel } from '../data_segundo_nivel/data_segundo_nivel.entity';
import { DataTercerNivel } from '../data_tercer_nivel/data_tercer_nivel.entity';
import { CompareDataPrimerNivelDto } from './dto/compare-data_primer_nivel.dto';

export interface ComparacionResult {
  id_cliente: number;
  fecha: string;
  total_consumido: number;
  comparacion: number;
}

Injectable();
export class DataPrimerNivelService {
  constructor(
    @InjectRepository(Data_primer_nivel)
    private readonly dataPrimerNivelRepository: Repository<Data_primer_nivel>,

    @InjectRepository(DataSegundoNivel)
    private readonly dataSegundoNivelRepository: Repository<DataSegundoNivel>,

    @InjectRepository(DataTercerNivel)
    private readonly dataTercerNivelRepository: Repository<DataTercerNivel>,
  ) {}
  async createDataPrimerNivel(
    dataPrimerNivel: CreateDataPrimerNiveDto,
  ): Promise<Data_primer_nivel> {
    return this.dataPrimerNivelRepository.save(dataPrimerNivel);
  }
  async updateDataPrimerNivel(
    id_primer_nivel: number,
    dataPrimerNivel: UpdateDataPrimerNiveDto,
  ): Promise<Data_primer_nivel> {
    const found = await this.dataPrimerNivelRepository.findOne({
      where: { id_primer_nivel },
    });
    if (!found) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    const updated = Object.assign(found, dataPrimerNivel);
    return this.dataPrimerNivelRepository.save(updated);
  }
  async getDataPrimerNivelId(
    id_primer_nivel: number,
  ): Promise<Data_primer_nivel> {
    const dataPrimerNivelFound = await this.dataPrimerNivelRepository.findOne({
      where: { id_primer_nivel },
      relations: ['cliente', 'dataSegundos', 'dataSegundos.dataTerceros'],
    });

    if (!dataPrimerNivelFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return dataPrimerNivelFound;
  }
  async findDataPrimerNivelByFecha(
    fecha: string,
    tipo: string,
    option: 'pendiente' | 'facturado' | 'sin_consumo',
  ) {
    const field = option === 'pendiente' ? 'totalPendiente' : 'totalFacturado';

    return this.dataPrimerNivelRepository
      .createQueryBuilder('data')
      .leftJoinAndSelect('data.cliente', 'cliente')
      .leftJoinAndSelect('cliente.user', 'user')
      .leftJoinAndSelect('data.statusPrefacturas', 'statusPrefacturas')
      .where('data.fecha = :fecha', { fecha })
      .andWhere('data.tipo = :tipo', { tipo })
      .andWhere(`COALESCE(data.${field}, 0) > 0`)
      .orderBy('data.razon_social', 'ASC')
      .getMany();
  }

  async findDataPrimerNivelId(
    id_primer_nivel: number,
    tipo: string,
    option: 'pendiente' | 'facturado' | 'sin_consumo',
  ): Promise<Data_primer_nivel> {
    const qb = this.dataPrimerNivelRepository
      .createQueryBuilder('primer')
      .leftJoinAndSelect('primer.cliente', 'cliente')
      .leftJoinAndSelect('primer.dataSegundos', 'segundos')
      .leftJoinAndSelect('segundos.dataTerceros', 'terceros')
      .where('primer.id_primer_nivel = :id', { id: id_primer_nivel })
      .andWhere('segundos.tipo = :tipo', { tipo })
      .andWhere('terceros.tipo = :tipo', { tipo });

    if (option === 'facturado') {
      qb.andWhere('COALESCE(segundos.cantidadFacturada, 0) > 0').andWhere(
        'terceros.nro_factura IS NOT NULL',
      );
    } else {
      qb.andWhere('COALESCE(segundos.cantidadFacturada, 0) = 0').andWhere(
        'terceros.nro_factura IS NULL',
      );
    }

    // Ordenamiento
    qb.orderBy('segundos.cuenta', 'ASC') // primero por cuenta
      .addOrderBy('terceros.servicio', 'ASC'); // luego por servicio

    const dataPrimerNivelFound = await qb.getOne();

    if (!dataPrimerNivelFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return dataPrimerNivelFound;
  }

  async deleteDataPrimerNivel(id_primer_nivel: number) {
    const dataPrimerNivelFound = await this.dataPrimerNivelRepository.findOne({
      where: { id_primer_nivel },
    });

    if (!dataPrimerNivelFound) {
      throw new HttpException(
        `Facturacion ${id_primer_nivel} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dataSegundoNivelRepository.delete({ id_primer_nivel });

    await this.dataPrimerNivelRepository.remove(dataPrimerNivelFound);

    return { message: `Facturador ${id_primer_nivel} eliminado correctamente` };
  }

  async actualizarTotales(id_primer_nivel: number): Promise<{
    totalFacturado: number;
    totalPendiente: number;
  }> {
    // 🔹 Total facturado = nro_factura IS NULL
    const facturadoResult = await this.dataTercerNivelRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.total), 0)', 'totalFacturado')
      .where('t.id_primer_nivel = :id', { id: id_primer_nivel })
      .andWhere('t.nro_factura IS NULL')
      .getRawOne<{ totalFacturado: string }>();

    const totalFacturado =
      facturadoResult && facturadoResult.totalFacturado
        ? parseFloat(facturadoResult.totalFacturado)
        : 0;

    // 🔹 Total pendiente = nro_factura IS NOT NULL
    const pendienteResult = await this.dataTercerNivelRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.total), 0)', 'totalPendiente')
      .where('t.id_primer_nivel = :id', { id: id_primer_nivel })
      .andWhere('t.nro_factura IS NOT NULL')
      .getRawOne<{ totalPendiente: string }>();

    const totalPendiente =
      pendienteResult && pendienteResult.totalPendiente
        ? parseFloat(pendienteResult.totalPendiente)
        : 0;
    // 🔹 Actualizar en data_primer_nivel
    const total_consumido = totalFacturado + totalPendiente;
    await this.dataPrimerNivelRepository.update(id_primer_nivel, {
      totalFacturado,
      totalPendiente,
      total_consumido,
    });

    return {
      totalFacturado,
      totalPendiente,
    };
  }

  async compareConsumptionPerMonth(
    compareDto: CompareDataPrimerNivelDto,
  ): Promise<ComparacionResult | null> {
    const { id_cliente, fecha } = compareDto;

    const result = await this.dataPrimerNivelRepository
      .createQueryBuilder('c1')
      .leftJoin(
        'data_primer_nivel',
        'c2',
        `c2.id_cliente = c1.id_cliente
       AND c2.fecha = DATE_FORMAT(
          DATE_SUB(CONCAT(c1.fecha, '-01'), INTERVAL 1 MONTH),
          '%Y-%m'
       )`,
      )
      .select([
        `CASE
        WHEN c2.total_consumido IS NULL THEN 2
        WHEN c1.total_consumido > c2.total_consumido THEN 2
        WHEN c1.total_consumido < c2.total_consumido THEN 1
        ELSE 0
      END AS comparacion`,
      ])
      .where('c1.id_cliente = :id_cliente', { id_cliente })
      .andWhere('c1.fecha = :fecha', { fecha })
      .getRawOne<ComparacionResult>();

    if (!result) return null;

    // 🔹 Convertimos a número
    return {
      ...result,
      comparacion: Number(result.comparacion),
    };
  }
}
