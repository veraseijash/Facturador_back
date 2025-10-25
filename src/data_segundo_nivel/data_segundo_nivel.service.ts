import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSegundoNivel } from './data_segundo_nivel.entity';
import { Data_primer_nivel } from '../data_primer_nivel/data_primer_nivel.entity';
import { CreateDataSegundoNivelDto } from './dto/create-data_segundo_nivel.dto';
import { UpdateDataSegundoNivelDto } from './dto/update-data_segundo_nivel.dto';

@Injectable()
export class DataSegundoNivelService {
  constructor(
    @InjectRepository(DataSegundoNivel)
    private readonly dataSegundoNivelRepository: Repository<DataSegundoNivel>,

    @InjectRepository(Data_primer_nivel)
    private readonly dataPrimerNivelRepository: Repository<Data_primer_nivel>,
  ) {}

  // -------------------- Crear --------------------
  async createDataSegundoNivel(
    dataSegundoNivelDto: CreateDataSegundoNivelDto,
  ): Promise<DataSegundoNivel> {
    let primerNivel: Data_primer_nivel | null = null;

    if (dataSegundoNivelDto.id_primer_nivel) {
      primerNivel = await this.dataPrimerNivelRepository.findOne({
        where: { id_primer_nivel: dataSegundoNivelDto.id_primer_nivel },
      });

      if (!primerNivel) {
        throw new HttpException(
          'Registro padre no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.dataSegundoNivelRepository.save(dataSegundoNivelDto);
  }

  // -------------------- Actualizar --------------------
  async updateDataSegundoNivel(
    id_segundo_nivel: number,
    dataSegundoNivelDto: UpdateDataSegundoNivelDto,
  ): Promise<DataSegundoNivel> {
    const found = await this.dataSegundoNivelRepository.findOne({
      where: { id_segundo_nivel },
      relations: ['dataPrimerNivel'], // opcional, si quieres incluir la relación
    });

    if (!found) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si se envía id_primer_nivel, buscar el padre
    if (dataSegundoNivelDto.id_primer_nivel) {
      const primerNivel = await this.dataPrimerNivelRepository.findOne({
        where: { id_primer_nivel: dataSegundoNivelDto.id_primer_nivel },
      });

      if (!primerNivel) {
        throw new HttpException(
          `Registro padre no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Asignar el objeto padre a la relación
      dataSegundoNivelDto.dataPrimerNivel = primerNivel;
      delete dataSegundoNivelDto.id_primer_nivel;
    }

    // Asignar los cambios al objeto existente
    Object.assign(found, dataSegundoNivelDto);

    // Guardar la entidad completa
    return this.dataSegundoNivelRepository.save(found);
  }

  // -------------------- Obtener por ID --------------------
  async getDataSegundoNivelId(
    id_segundo_nivel: number,
  ): Promise<DataSegundoNivel> {
    const dataSegundoNivelFound = await this.dataSegundoNivelRepository.findOne(
      {
        where: { id_segundo_nivel },
        relations: ['dataTerceros'], // opcional: cargar la relación
      },
    );

    if (!dataSegundoNivelFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return dataSegundoNivelFound;
  }

  // -------------------- Obtener por primer nivel --------------------
  async findDataSegundoNivelByIdPrimer(id_primer_nivel: number) {
    return await this.dataSegundoNivelRepository.find({
      where: { id_primer_nivel },
      order: { cuenta: 'ASC' },
      relations: ['dataTerceros'], // opcional
    });
  }

  // -------------------- Eliminar --------------------
  async deleteDataSegundoNivel(id_segundo_nivel: number) {
    const dataSegundoNivelFound = await this.dataSegundoNivelRepository.findOne(
      {
        where: { id_segundo_nivel },
      },
    );

    if (!dataSegundoNivelFound) {
      throw new HttpException(
        `Cuenta ${id_segundo_nivel} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dataSegundoNivelRepository.remove(dataSegundoNivelFound);

    return { message: `Cuenta ${id_segundo_nivel} eliminada correctamente` };
  }

  // -------------------- Eliminar por primer nivel--------------------
  async deleteDataSegundoNivelByPrimer(id_primer_nivel: number) {
    const dataSegundoNivelFound = await this.dataSegundoNivelRepository.findOne(
      {
        where: { id_primer_nivel },
      },
    );

    if (!dataSegundoNivelFound) {
      throw new HttpException(
        `Cuenta ${id_primer_nivel} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.dataSegundoNivelRepository.remove(dataSegundoNivelFound);

    return { message: `Cuenta ${id_primer_nivel} eliminada correctamente` };
  }
}
