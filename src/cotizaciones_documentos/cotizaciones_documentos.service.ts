import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CotizacionesDocumentos } from './cotizaciones_documentos.entity';
import { CreateCotizacionesDocumentosDto } from './dto/create-cotizaciones_documentos.dto';
import { UpdateCotizacionesDocumentosDto } from './dto/update-cotizaciones_documentos.dto';
import { CotizacionesDocumentosRaw } from './interfaces/documento-raw.interface';
@Injectable()
export class CotizacionesDocumentosService {
  constructor(
    @InjectRepository(CotizacionesDocumentos)
    private CotizacionesDocumentosRepository: Repository<CotizacionesDocumentos>,
  ) {}

  async createCotizacionesDocumentos(
    CotizacionesDocumentos: CreateCotizacionesDocumentosDto,
  ): Promise<any> {
    return this.CotizacionesDocumentosRepository.save(CotizacionesDocumentos);
  }

  async updateCreateCotizaciones(
    id_cot_doc: number,
    CotizacionesDocumentos: UpdateCotizacionesDocumentosDto,
  ) {
    const cotizacionesDocumentosFound =
      await this.CotizacionesDocumentosRepository.findOne({
        where: {
          id_cot_doc,
        },
      });
    if (!cotizacionesDocumentosFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    const cotizacionesDocumentos = Object.assign(
      cotizacionesDocumentosFound,
      CotizacionesDocumentos,
    );
    return this.CotizacionesDocumentosRepository.save(cotizacionesDocumentos);
  }

  async getCotizacionesById(id_cot_doc: number) {
    const cotizacionesDocumentosFound =
      await this.CotizacionesDocumentosRepository.find({
        where: { id_cot_doc },
      });
    if (!cotizacionesDocumentosFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return cotizacionesDocumentosFound;
  }

  async deleteCreateCotizaciones(id_cot_doc: number) {
    const cotizacionesDocumentos =
      await this.CotizacionesDocumentosRepository.findOne({
        where: { id_cot_doc },
      });

    if (!cotizacionesDocumentos) {
      throw new HttpException(
        `El status prefactura con id ${id_cot_doc} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.CotizacionesDocumentosRepository.remove(cotizacionesDocumentos);

    return {
      message: `status prefactura ${id_cot_doc} eliminado correctamente`,
    };
  }

  async findByPrimerNivel(id_primer_nivel: number) {
    return await this.CotizacionesDocumentosRepository.createQueryBuilder('doc')
      .select([
        'doc.id_cot_doc AS id_doc_fact',
        `CASE 
          WHEN doc.tipo_documento = '1' THEN '801 - Orden de Compra'
          WHEN doc.tipo_documento = '2' THEN '802 - Nota de Pedido'
          WHEN doc.tipo_documento = '3' THEN '803 - Contrato'
          WHEN doc.tipo_documento = '4' THEN '804 - Resolución'
          WHEN doc.tipo_documento = '5' THEN 'HAS - HAS'
          WHEN doc.tipo_documento = '6' THEN 'EM - Entrada de Mercadería'
          WHEN doc.tipo_documento = '7' THEN 'HEM - Recepción de Material'
          WHEN doc.tipo_documento = '8' THEN 'HES - HES'
          WHEN doc.tipo_documento = '9' THEN 'CON - Conformidad'
        END AS tipo_documento`,
        'doc.cot_id AS cot_id',
        `'Cotizador' AS procedencia`,
        `DATE_FORMAT(doc.fecha_documento, '%d-%m-%Y') AS fecha_documento`,
        'doc.id_documento AS id_documento',
        'doc.tipo_documento AS idtipo_documento',
        'doc.nombre_documento AS nombre_documento',
        'doc.id_cot_doc AS id',
      ])
      .where('doc.id_primer_nivel = :id_primer_nivel', { id_primer_nivel })
      .getRawMany<CotizacionesDocumentosRaw>();
  }
}
