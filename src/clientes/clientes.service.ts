import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './clientes.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { UpdateClienteDto } from './dto/update-clientes';
import { CreateClienteDto } from './dto/create-clientes.dto';

Injectable();
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}
  async creatCliente(cliente: CreateClienteDto): Promise<Cliente> {
    return this.clientesRepository.save(cliente);
  }
  async updateClientes(
    id_cliente: number,
    cliente: UpdateClienteDto,
  ): Promise<Cliente> {
    const found = await this.clientesRepository.findOne({
      where: { id_cliente },
    });
    if (!found) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    const updated = Object.assign(found, cliente);
    return this.clientesRepository.save(updated);
  }
  async getClientesId(id_cliente: number): Promise<Cliente> {
    const clienteFound = await this.clientesRepository.findOne({
      where: { id_cliente },
    });

    if (!clienteFound) {
      throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }

    return clienteFound;
  }
  async getClientesPorCountry(countryId: number): Promise<Cliente[]> {
    if (countryId === undefined || isNaN(countryId)) {
      throw new BadRequestException('Debe suministrarse un country_id válido');
    }

    const where: FindOptionsWhere<Cliente> = {
      activo: 1,
      country_id: countryId,
    };

    return this.clientesRepository.find({
      where,
      order: { razon_social: 'ASC' },
    });
  }
}
