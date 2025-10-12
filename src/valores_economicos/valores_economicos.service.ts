import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValoresEconomicos } from './valores_economicos.entity';
import { Repository } from 'typeorm';
import { CreateValoresEconomicosDto } from './dto/create-valores_economicos.dto';
import { UpdateValoresEconomicosDto } from './dto/update-valores_economicos.dto';

Injectable();
export class ValoresEconomicosService {
  constructor(
    @InjectRepository(ValoresEconomicos)
    private ValoresEconomicosRepository: Repository<ValoresEconomicos>,
  ) {}

  async createValoresEconomicos(
    ValoresEconomicos: CreateValoresEconomicosDto,
  ): Promise<any> {
    return this.ValoresEconomicosRepository.save(ValoresEconomicos);
  }

  async updateValoresEconomicos(
    id_valor: number,
    ValoresEconomicos: UpdateValoresEconomicosDto,
  ) {
    const valoresEconomicosFound =
      await this.ValoresEconomicosRepository.findOne({
        where: {
          id_valor,
        },
      });
    if (!valoresEconomicosFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    const statusValoresEconomicos = Object.assign(
      valoresEconomicosFound,
      ValoresEconomicos,
    );
    return this.ValoresEconomicosRepository.save(statusValoresEconomicos);
  }

  async getValoresEconomicosById(id_valor: number) {
    const valoresEconomicosFound = await this.ValoresEconomicosRepository.find({
      where: { id_valor },
    });
    if (!valoresEconomicosFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return valoresEconomicosFound;
  }

  async getValoresEconomicos(): Promise<ValoresEconomicos[]> {
    return this.ValoresEconomicosRepository.find({
      order: { fecha: 'DESC' },
      take: 10,
    });
  }
}
