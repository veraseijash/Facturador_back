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
import { FindDataPrimerNivelIdDto } from './dto/find-data-primer-nivel-id.dto';
import { CompareDataPrimerNivelDto } from './dto/compare-data_primer_nivel.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('dataPrimerNivel')
export class DataPrimerNivelController {
  constructor(private dataPrimerNivelService: DataPrimerNivelService) {}

  @UseGuards(JwtUserGuard)
  @Post('por-fecha-tipo')
  async buscarPorFechaYTipo(@Body() dto: FindDataPrimerNivelDto) {
    return this.dataPrimerNivelService.findDataPrimerNivelByFecha(
      dto.fecha,
      dto.tipo,
      dto.option,
    );
  }
  @UseGuards(JwtUserGuard)
  @Post('por-tipo-id')
  async findDataPrimerNivelId(@Body() dto: FindDataPrimerNivelIdDto) {
    return this.dataPrimerNivelService.findDataPrimerNivelId(
      dto.id,
      dto.tipo,
      dto.option,
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

  @UseGuards(JwtUserGuard)
  @Patch('actualizar-totales/:id')
  async actualizarTotales(@Param('id') id: number) {
    return this.dataPrimerNivelService.actualizarTotales(id);
  }

  @UseGuards(JwtUserGuard)
  @Post('comparar')
  async compareConsumption(@Body() compareDto: CompareDataPrimerNivelDto) {
    return this.dataPrimerNivelService.compareConsumptionPerMonth(compareDto);
  }
}
