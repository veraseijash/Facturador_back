import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Data_primer_nivel } from './data_primer_nivel.entity';
import { Repository } from 'typeorm';
import { CreateDataPrimerNiveDto } from './dto/create-data_primer_nivel.dto';
import { UpdateDataPrimerNiveDto } from './dto/update-data_primer_nivel.dto';

Injectable();
export class DataPrimerNivelService {
  constructor(
    @InjectRepository(Data_primer_nivel)
    private dataPrimerNivelRepository: Repository<Data_primer_nivel>,
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
      relations: ['cliente'],
    });

    if (!dataPrimerNivelFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return dataPrimerNivelFound;
  }
  async findDataPrimerNiveByFecha(fecha: string, tipo: string) {
    return await this.dataPrimerNivelRepository.find({
      where: {
        fecha: fecha,
        tipo: tipo,
      },
      order: { razon_social: 'ASC' },
      relations: ['cliente'],
    });
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

    await this.dataPrimerNivelRepository.remove(dataPrimerNivelFound);

    return { message: `Facturador ${id_primer_nivel} eliminado correctamente` };
  }
}
