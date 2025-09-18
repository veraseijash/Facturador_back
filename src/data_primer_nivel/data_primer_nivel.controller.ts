import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DataPrimerNivelService } from './data_primer_nivel.service';
import { CreateDataPrimerNiveDto } from './dto/create-data_primer_nivel.dto';
import { UpdateDataPrimerNiveDto } from './dto/update-data_primer_nivel.dto';
import { FindDataPrimerNivelDto } from './dto/find-data-primer-nivel.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('dataPrimerNivel')
export class DataPrimerNivelController {
  constructor(private dataPrimerNivelService: DataPrimerNivelService) {}

  @UseGuards(JwtUserGuard)
  @Post('por-fecha-tipo')
  async buscarPorFechaYTipo(@Body() dto: FindDataPrimerNivelDto) {
    return this.dataPrimerNivelService.findDataPrimerNiveByFecha(
      dto.fecha,
      dto.tipo,
    );
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDataPrimerNiveDto,
  ) {
    return this.dataPrimerNivelService.updateDataPrimerNivel(id, updateDto);
  }

  @UseGuards(JwtUserGuard)
  @Post()
  async create(@Body() createDto: CreateDataPrimerNiveDto) {
    return this.dataPrimerNivelService.createDataPrimerNivel(createDto);
  }

  @UseGuards(JwtUserGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.dataPrimerNivelService.getDataPrimerNivelId(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.dataPrimerNivelService.deleteDataPrimerNivel(id);
  }
}
