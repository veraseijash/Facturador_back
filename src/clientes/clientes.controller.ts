import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Query,
  Optional,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { UpdateClienteDto } from './dto/update-clientes';
import { CreateClienteDto } from './dto/create-clientes.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';
import { Cliente } from './clientes.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateClienteDto,
  ) {
    return this.clientesService.updateClientes(id, updateDto);
  }

  @UseGuards(JwtUserGuard)
  @Post()
  async create(@Body() createDto: CreateClienteDto) {
    return this.clientesService.creatCliente(createDto);
  }

  @UseGuards(JwtUserGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.getClientesId(id);
  }

  @UseGuards(JwtUserGuard)
  @Get('activos/:id') // ahora recibe el country_id como parte de la URL
  async getClientesActivos(
    @Param('id', ParseIntPipe) countryId: number, // obligatorio y convertido a número
  ): Promise<Cliente[]> {
    return this.clientesService.getClientesPorCountry(countryId);
  }
}
