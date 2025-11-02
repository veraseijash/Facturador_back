import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DocumentosFacturadorService } from './documentos_facturador.service';
import { CreateDocumentosFacturadorDto } from './dto/create-documentos_facturador.dto';
import { UpdateDocumentosFacturadorDto } from './dto/update-documentos_facturador.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import type { Request } from 'express';

@Controller('documentosFacturador')
export class DocumentosFacturadorController {
  constructor(
    private documentosFacturadorService: DocumentosFacturadorService,
  ) {}

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createDocumentosFacturador(
    @Body() newDocumentosFacturador: CreateDocumentosFacturadorDto,
  ) {
    console.log('📥 BODY recibido:', newDocumentosFacturador);
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
  findByPrimerNivel(
    @Param('id', ParseIntPipe) id_primer_nivel: number,
    @Req() req: Request,
  ) {
    return this.documentosFacturadorService.findByPrimerNivel(
      id_primer_nivel,
      req,
    );
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/pdf',
        filename: (req: any, file: Express.Multer.File, cb: Function) => {
          const uploadDir = './public/pdf';
          const ext = path.extname(file.originalname); // extensión (.pdf)
          const baseName = path.basename(file.originalname, ext); // nombre sin extensión

          let finalName = `${baseName}${ext}`;
          let counter = 1;

          // Verifica si ya existe un archivo con ese nombre
          while (fs.existsSync(path.join(uploadDir, finalName))) {
            finalName = `${baseName}(${counter})${ext}`;
            counter++;
          }

          cb(null, finalName);
        },
      }) as StorageEngine,
      fileFilter: (req: any, file: Express.Multer.File, cb: Function) => {
        if (!file.mimetype.match(/application\/pdf$/)) {
          return cb(new Error('Solo se permiten archivos PDF'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No se envió archivo' };
    }

    return {
      message: 'ok',
      fileName: file.filename,
    };
  }
}
