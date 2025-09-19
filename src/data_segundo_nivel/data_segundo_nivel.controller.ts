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
import { DataSegundoNivelService } from './data_segundo_nivel.service';
import { CreateDataSegundoNivelDto } from './dto/create-data_segundo_nivel.dto';
import { UpdateDataSegundoNivelDto } from './dto/update-data_segundo_nivel.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';
@Controller('dataSegundoNivel')
export class DataSegundoNivelController {
  constructor(private dataSegundoNivelService: DataSegundoNivelService) {}

  @UseGuards(JwtUserGuard)
  @Post()
  async createDataSegundoNivel(@Body() createDto: CreateDataSegundoNivelDto) {
    return this.dataSegundoNivelService.createDataSegundoNivel(createDto);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDataSegundoNivelDto,
  ) {
    return this.dataSegundoNivelService.updateDataSegundoNivel(id, updateDto);
  }

  @UseGuards(JwtUserGuard)
  @Get(':id')
  async getDataSegundoNivelId(@Param('id', ParseIntPipe) id: number) {
    return this.dataSegundoNivelService.getDataSegundoNivelId(id);
  }

  @UseGuards(JwtUserGuard)
  @Get('find/:id')
  async findDataSegundoNiveByIdPrimer(@Param('id', ParseIntPipe) id: number) {
    return this.dataSegundoNivelService.findDataSegundoNivelByIdPrimer(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async deleteDataSegundoNivel(@Param('id', ParseIntPipe) id: number) {
    return this.dataSegundoNivelService.deleteDataSegundoNivel(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete('delete-primer/:id')
  async deleteDataSegundoNivelByPrimer(@Param('id', ParseIntPipe) id: number) {
    return this.dataSegundoNivelService.deleteDataSegundoNivelByPrimer(id);
  }
}
