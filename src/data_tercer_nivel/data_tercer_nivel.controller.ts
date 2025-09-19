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
import { DataTercerNivelService } from './data_tercer_nivel.service';
import { CreateDataTercerNivelDto } from './dto/create-data_tercer_nivel.dto';
import { UpdateDataTercerNivelDto } from './dto/update-data_tercer_nivel.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';
@Controller('dataTercerNivel')
export class DataTercerNivelController {
  constructor(private dataTercerNivelService: DataTercerNivelService) {}

  @UseGuards(JwtUserGuard)
  @Post()
  async createDataTercerNivel(@Body() createDto: CreateDataTercerNivelDto) {
    return this.dataTercerNivelService.createDataTercerNivel(createDto);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDataTercerNivelDto,
  ) {
    return this.dataTercerNivelService.updateDataSegundoNivel(id, updateDto);
  }

  @UseGuards(JwtUserGuard)
  @Get(':id')
  async getDataTercerNivelId(@Param('id', ParseIntPipe) id: number) {
    return this.dataTercerNivelService.getDataTercerNivelId(id);
  }

  @UseGuards(JwtUserGuard)
  @Get('find/:id')
  async findDataTercerNivelByIdSegundo(@Param('id', ParseIntPipe) id: number) {
    return this.dataTercerNivelService.findDataTercerNivelByIdSegundo(id);
  }

  @UseGuards(JwtUserGuard)
  @Get('find-primer/:id')
  async findDataTercerNivelByIdPrimer(@Param('id', ParseIntPipe) id: number) {
    return this.dataTercerNivelService.findDataTercerNivelByIdPrimer(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async deleteDataTercerNivel(@Param('id', ParseIntPipe) id: number) {
    return this.dataTercerNivelService.deleteDataTercerNivel(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete('delete-primer/:id')
  deleteDataTercerNivelByprimer(@Param('id', ParseIntPipe) id: number) {
    return this.dataTercerNivelService.deleteDataTercerNivelByprimer(id);
  }
}
