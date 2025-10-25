import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataTercerNivel } from './data_tercer_nivel.entity';
import { CreateDataTercerNivelDto } from './dto/create-data_tercer_nivel.dto';
import { UpdateDataTercerNivelDto } from './dto/update-data_tercer_nivel.dto';
import { DataSegundoNivel } from '../data_segundo_nivel/data_segundo_nivel.entity';
import { DataPrimerNivelService } from '../data_primer_nivel/data_primer_nivel.service';

@Injectable()
export class DataTercerNivelService {
  constructor(
    @InjectRepository(DataTercerNivel)
    private readonly dataTercerNivelRepository: Repository<DataTercerNivel>,
    private readonly dataPrimerNivelService: DataPrimerNivelService,

    @InjectRepository(DataSegundoNivel)
    private readonly dataSegundoNivelRepository: Repository<DataSegundoNivel>,
  ) {}

  // -------------------- Crear --------------------
  async createDataTercerNivel(
    dataTercerNivelDto: CreateDataTercerNivelDto,
  ): Promise<DataTercerNivel> {
    let segundoNivel: DataSegundoNivel | null = null;

    if (dataTercerNivelDto.id_segundo_nivel) {
      segundoNivel = await this.dataSegundoNivelRepository.findOne({
        where: { id_segundo_nivel: dataTercerNivelDto.id_segundo_nivel },
      });
      if (!segundoNivel) {
        throw new HttpException(
          'Registro padre no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.dataTercerNivelRepository.save(dataTercerNivelDto);
  }

  // -------------------- Actualizar --------------------
  async updateDataSegundoNivel(
    id_tercer_nivel: number,
    dataTercerNivelDto: UpdateDataTercerNivelDto,
  ): Promise<DataTercerNivel> {
    const found = await this.dataTercerNivelRepository.findOne({
      where: { id_tercer_nivel },
      relations: ['dataSegundoNivel'], // opcional, si quieres incluir la relación
    });

    if (!found) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si se envía id_primer_nivel, buscar el padre
    if (dataTercerNivelDto.id_segundo_nivel) {
      const segundoNivel = await this.dataSegundoNivelRepository.findOne({
        where: { id_segundo_nivel: dataTercerNivelDto.id_segundo_nivel },
      });

      if (!segundoNivel) {
        throw new HttpException(
          `Registro padre no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Asignar el objeto padre a la relación
      dataTercerNivelDto.dataSegundoNivel = segundoNivel;
      delete dataTercerNivelDto.id_segundo_nivel;
    }

    // Asignar los cambios al objeto existente
    Object.assign(found, dataTercerNivelDto);

    // Guardar la entidad completa
    return this.dataSegundoNivelRepository.save(found);
  }

  // -------------------- Obtener por ID --------------------
  async getDataTercerNivelId(
    id_tercer_nivel: number,
  ): Promise<DataTercerNivel> {
    const dataTercerNivelFound = await this.dataTercerNivelRepository.findOne({
      where: { id_tercer_nivel }, // opcional: cargar la relación
    });

    if (!dataTercerNivelFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return dataTercerNivelFound;
  }

  // -------------------- Obtener por segundo nivel --------------------
  async findDataTercerNivelByIdSegundo(id_segundo_nivel: number) {
    return await this.dataTercerNivelRepository.find({
      where: { id_segundo_nivel },
      order: { servicio: 'ASC' }, // opcional
    });
  }

  // -------------------- Obtener por primer nivel --------------------
  async findDataTercerNivelByIdPrimer(id_primer_nivel: number) {
    return await this.dataTercerNivelRepository.find({
      where: { id_primer_nivel },
      order: { servicio: 'ASC' },
    });
  }

  // -------------------- Eliminar --------------------
  async deleteDataTercerNivel(id_tercer_nivel: number) {
    // Buscar registro
    const dataTercerNivelFound = await this.dataTercerNivelRepository.findOne({
      where: { id_tercer_nivel },
    });

    if (!dataTercerNivelFound) {
      throw new HttpException(
        `Cuenta ${id_tercer_nivel} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Verificar id_primer_nivel
    const id_primer_nivel = dataTercerNivelFound.id_primer_nivel;
    if (!id_primer_nivel) {
      throw new HttpException(
        `El registro ${id_tercer_nivel} no tiene un id_primer_nivel asociado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Eliminar registro
    await this.dataTercerNivelRepository.remove(dataTercerNivelFound);

    // Actualizar totales en primer nivel
    const totales =
      await this.dataPrimerNivelService.actualizarTotales(id_primer_nivel);

    return {
      message: true,
      ...totales,
    };
  }

  // -------------------- Eliminar por primer nivel --------------------
  async deleteDataTercerNivelByprimer(id_primer_nivel: number) {
    const dataTercerNivelFound = await this.dataTercerNivelRepository.findOne({
      where: { id_primer_nivel },
    });

    if (!dataTercerNivelFound) {
      throw new HttpException(
        `Cuenta ${id_primer_nivel} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dataTercerNivelRepository.remove(dataTercerNivelFound);

    return { message: `Servicio ${id_primer_nivel} eliminada correctamente` };
  }
}
