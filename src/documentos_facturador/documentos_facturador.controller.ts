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
import { DocumentosFacturadorService } from './documentos_facturador.service';
import { CreateDocumentosFacturadorDto } from './dto/create-documentos_facturador.dto';
import { UpdateDocumentosFacturadorDto } from './dto/update-documentos_facturador.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('documentosFacturador')
export class DocumentosFacturadorController {
  constructor(
    private documentosFacturadorService: DocumentosFacturadorService,
  ) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createStatusPrefactura(
    @Body() newDocumentosFacturador: CreateDocumentosFacturadorDto,
  ) {
    return this.documentosFacturadorService.createDocumentosFacturador(
      newDocumentosFacturador,
    );
  }

  @UseGuards(JwtUserGuard)
  @Patch(':id')
  updateDocumentosFacturador(
    @Param('id', ParseIntPipe) id_doc_fact: number,
    @Body() newDocumentosFacturador: UpdateDocumentosFacturadorDto,
  ) {
    return this.documentosFacturadorService.updateDocumentosFacturador(
      id_doc_fact,
      newDocumentosFacturador,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('/:id')
  getDocumentosFacturadorById(@Param('id', ParseIntPipe) id: number) {
    return this.documentosFacturadorService.getDocumentosFacturadorById(id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':id')
  async deleteDocumentosFacturador(
    @Param('id', ParseIntPipe) id_doc_fact: number,
  ) {
    return await this.documentosFacturadorService.deleteDocumentosFacturador(
      id_doc_fact,
    );
  }

  @UseGuards(JwtUserGuard)
  @Get('find/:id')
  findByPrimerNivel(@Param('id', ParseIntPipe) id_primer_nivel: number) {
    return this.documentosFacturadorService.findByPrimerNivel(id_primer_nivel);
  }
}
