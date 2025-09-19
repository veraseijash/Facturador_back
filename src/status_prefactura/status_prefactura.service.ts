import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusPrefactura } from './status_prefactura.entity';
import { CreateStatusPrefacturaDto } from './dto/create-status_prefactura.dto';
import { UpdateStatusPrefacturaDto } from './dto/update-status_prefactura.dto';

@Injectable()
export class StatusPrefacturaService {
  constructor(
    @InjectRepository(StatusPrefactura)
    private statusPrefacturaRepository: Repository<StatusPrefactura>,
  ) {}

  async createStatusPrefactura(
    StatusPrefactura: CreateStatusPrefacturaDto,
  ): Promise<any> {
    return this.statusPrefacturaRepository.save(StatusPrefactura);
  }
  async updateStatusPrefactura(
    id: number,
    statusPrefactura: UpdateStatusPrefacturaDto,
  ) {
    const statusPrefacturaFound = await this.statusPrefacturaRepository.findOne(
      {
        where: {
          id,
        },
      },
    );
    if (!statusPrefacturaFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    const statusPrefacturaWaypay = Object.assign(
      statusPrefacturaFound,
      statusPrefactura,
    );
    return this.statusPrefacturaRepository.save(statusPrefacturaWaypay);
  }
  async getStatusPrefacturaById(id: number) {
    const statusPrefacturaFound = await this.statusPrefacturaRepository.find({
      where: { id },
    });
    if (!statusPrefacturaFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return statusPrefacturaFound;
  }
  async deleteStatusPrefactura(id: number) {
    const statusPrefactura = await this.statusPrefacturaRepository.findOne({
      where: { id },
    });

    if (!statusPrefactura) {
      throw new HttpException(
        `El status prefactura con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.statusPrefacturaRepository.remove(statusPrefactura);

    return { message: `status prefactura ${id} eliminado correctamente` };
  }
}
