import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentosFacturador } from './documentos_facturador.entity';
import { CreateDocumentosFacturadorDto } from './dto/create-documentos_facturador.dto';
import { UpdateDocumentosFacturadorDto } from './dto/update-documentos_facturador.dto';
import { DocumentoFacturadorRaw } from './interfaces/documento-raw.interface';

@Injectable()
export class DocumentosFacturadorService {
  constructor(
    @InjectRepository(DocumentosFacturador)
    private DocumentosFacturadorRepository: Repository<DocumentosFacturador>,
  ) {}

  async createDocumentosFacturador(
    DocumentosFacturador: CreateDocumentosFacturadorDto,
  ): Promise<any> {
    return this.DocumentosFacturadorRepository.save(DocumentosFacturador);
  }

  async updateDocumentosFacturador(
    id_doc_fact: number,
    DocumentosFacturador: UpdateDocumentosFacturadorDto,
  ) {
    const documentosFacturadorFound =
      await this.DocumentosFacturadorRepository.findOne({
        where: {
          id_doc_fact,
        },
      });
    if (!documentosFacturadorFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    const documentosFacturador = Object.assign(
      documentosFacturadorFound,
      DocumentosFacturador,
    );
    return this.DocumentosFacturadorRepository.save(documentosFacturador);
  }

  async getDocumentosFacturadorById(id_doc_fact: number) {
    const documentosFacturadorFound =
      await this.DocumentosFacturadorRepository.find({
        where: { id_doc_fact },
      });
    if (!documentosFacturadorFound) {
      return new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return documentosFacturadorFound;
  }

  async deleteDocumentosFacturador(id_doc_fact: number) {
    const documentosFacturador =
      await this.DocumentosFacturadorRepository.findOne({
        where: { id_doc_fact },
      });

    if (!documentosFacturador) {
      throw new HttpException(
        `El status prefactura con id ${id_doc_fact} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.DocumentosFacturadorRepository.remove(documentosFacturador);

    return {
      message: `status prefactura ${id_doc_fact} eliminado correctamente`,
    };
  }

  async findByPrimerNivel(id_primer_nivel: number) {
    return await this.DocumentosFacturadorRepository.createQueryBuilder('doc')
      .select([
        'doc.id_doc_fact AS id_doc_fact',
        `CASE doc.tipo_documento
          WHEN '1' THEN '801 - Orden de Compra'
          WHEN '2' THEN '802 - Nota de Pedido'
          WHEN '3' THEN '803 - Contrato'
          WHEN '4' THEN '804 - Resolución'
          WHEN '5' THEN 'HAS - HAS'
          WHEN '6' THEN 'EM - Entrada de Mercadería'
          WHEN '7' THEN 'HEM - Recepción de Material'
          WHEN '8' THEN 'HES - HES'
          WHEN '9' THEN 'CON - Conformidad'
        END AS tipo_documento`,
        'doc.cot_id AS cot_id',
        'doc.procedencia AS procedencia',
        `DATE_FORMAT(doc.fecha_documento, '%d-%m-%Y') AS fecha_documento`,
        'doc.id_documento AS id_documento',
        'doc.tipo_documento AS idtipo_documento',
        'doc.nombre_documento AS nombre_documento',
        'doc.id_doc_fact AS id',
      ])
      .where('doc.id_primer_nivel = :id_primer_nivel', { id_primer_nivel })
      .orderBy('doc.fecha_documento', 'DESC')
      .getRawMany<DocumentoFacturadorRaw>();
  }
}
