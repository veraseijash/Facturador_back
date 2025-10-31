import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('documentos_facturador')
export class DocumentosFacturador {
  @PrimaryGeneratedColumn({ name: 'id_doc_fact', type: 'bigint' })
  id_doc_fact: number;

  @Column({ name: 'id_documento', type: 'varchar', length: 30 })
  id_documento: string;

  @Column({ name: 'tipo_documento', type: 'varchar', length: 1 })
  tipo_documento: string;

  @Column({ name: 'fecha_documento', type: 'datetime' })
  fecha_documento: Date;

  @Column({ name: 'nombre_documento', type: 'varchar', length: 100 })
  nombre_documento: string;

  @Column({ name: 'nro_documento', type: 'varchar', length: 12 })
  nro_documento: string;

  @Column({
    name: 'fecha',
    type: 'varchar',
    length: 15,
    comment: 'fecha donde aparecera el documento',
  })
  fecha: string;

  @Column({ name: 'id_tercer_nivel', type: 'int' })
  id_tercer_nivel: number;

  @Column({
    name: 'id_primer_nivel',
    type: 'int',
    default: 0,
  })
  id_primer_nivel: number;

  @Column({ name: 'procedencia', type: 'varchar', length: 100 })
  procedencia: string;

  @Column({ name: 'cot_id', type: 'int', nullable: true })
  cot_id: number | null;

  @Column({ name: 'identificador', type: 'bigint' })
  identificador: number;
}
