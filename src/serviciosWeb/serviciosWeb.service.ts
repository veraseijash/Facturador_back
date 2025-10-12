import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiciosWeb } from './serviciosWeb.entity';
import { Repository } from 'typeorm';
import { CreateServiciosWebDto } from './dto/create-serviciosWeb.dto';
import { UpdateServiciosWebDto } from './dto/update-serviciosWeb.dto';

Injectable();
export class ServiciosWebService {
  constructor(
    @InjectRepository(ServiciosWeb)
    private ServiciosWebRepository: Repository<ServiciosWeb>,
  ) {}

  async createServiciosWeb(ServiciosWeb: CreateServiciosWebDto): Promise<any> {
    return this.ServiciosWebRepository.save(ServiciosWeb);
  }
  async updateServiciosWeb(
    ser_id: number,
    serviciosWeb: UpdateServiciosWebDto,
  ) {
    const serviciosWebFound = await this.ServiciosWebRepository.findOne({
      where: {
        ser_id,
      },
    });
    if (!serviciosWebFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    const statusServiciosWeb = Object.assign(serviciosWebFound, serviciosWeb);
    return this.ServiciosWebRepository.save(statusServiciosWeb);
  }
  async getServiciosWebById(ser_id: number) {
    const ServiciosWebFound = await this.ServiciosWebRepository.find({
      where: { ser_id },
    });
    if (!ServiciosWebFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return ServiciosWebFound;
  }
  async findActiveByCountry(countryId: number): Promise<ServiciosWeb[]> {
    return await this.ServiciosWebRepository.createQueryBuilder('s')
      .where('s.country_id = :countryId', { countryId })
      .andWhere('s.ser_estado = :estado', { estado: 1 })
      .andWhere('(s.tipo_servicio = :tipo1 OR s.tipo_servicio = :tipo2)', {
        tipo1: 'General',
        tipo2: 'Ida',
      })
      .orderBy('s.ser_servicio', 'ASC')
      .getMany();
  }
}
