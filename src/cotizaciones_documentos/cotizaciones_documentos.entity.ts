import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cotizaciones_documentos')
export class CotizacionesDocumentos {
  @PrimaryGeneratedColumn({ name: 'id_cot_doc', type: 'bigint' })
  id_cot_doc: number;

  @Column({ name: 'id_documento', type: 'varchar', length: 30 })
  id_documento: string;

  @Column({ name: 'tipo_documento', type: 'varchar', length: 1 })
  tipo_documento: string;

  @Column({ name: 'fecha_documento', type: 'datetime' })
  fecha_documento: Date;

  @Column({ name: 'nombre_documento', type: 'varchar', length: 100 })
  nombre_documento: string;

  @Column({ name: 'cot_id', type: 'bigint', nullable: true })
  cot_id: number | null;

  @Column({
    name: 'id_primer_nivel',
    type: 'int',
    default: 0,
  })
  id_primer_nivel: number;
}
