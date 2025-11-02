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
  Req,
} from '@nestjs/common';
import { CotizacionesDocumentosService } from './cotizaciones_documentos.service';
import { CreateCotizacionesDocumentosDto } from './dto/create-cotizaciones_documentos.dto';
import { UpdateCotizacionesDocumentosDto } from './dto/update-cotizaciones_documentos.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';
import type { Request } from 'express';

@Controller('cotizacionesDocumentos')
export class CotizacionesDocumentosController {
  constructor(
    private cotizacionesDocumentosService: CotizacionesDocumentosService,
  ) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createCotizacionesDocumentos(
    @Body() newCreateCotizacionesDocumentos: CreateCotizacionesDocumentosDto,
  ) {
    return this.cotizacionesDocumentosService.createCotizacionesDocumentos(
      newCreateCotizacionesDocumentos,
    );
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  updateCreateCotizaciones(
    @Param('id', ParseIntPipe) id_cot_doc: number,
    @Body() newUpdateCreateCotizaciones: UpdateCotizacionesDocumentosDto,
  ) {
    return this.cotizacionesDocumentosService.updateCreateCotizaciones(
      id_cot_doc,
      newUpdateCreateCotizaciones,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('/:id')
  getCotizacionesById(@Param('id', ParseIntPipe) id: number) {
    return this.cotizacionesDocumentosService.getCotizacionesById(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async deleteCreateCotizaciones(
    @Param('id', ParseIntPipe) id_cot_doc: number,
  ) {
    return await this.cotizacionesDocumentosService.deleteCreateCotizaciones(
      id_cot_doc,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('find/:id')
  findByPrimerNivel(
    @Param('id', ParseIntPipe) id_primer_nivel: number,
    @Req() req: Request,
  ) {
    return this.cotizacionesDocumentosService.findByPrimerNivel(
      id_primer_nivel,
      req,
    );
  }
}
