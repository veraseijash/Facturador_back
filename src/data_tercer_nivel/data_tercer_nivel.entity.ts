import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DataSegundoNivel } from '../data_segundo_nivel/data_segundo_nivel.entity';

@Entity('data_tercer_nivel')
export class DataTercerNivel {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id_tercer_nivel: number;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb4_0900_ai_ci' })
  cuenta: string;

  @Column({ type: 'bigint' })
  id_servicio: number;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb4_0900_ai_ci' })
  servicio: string;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb4_0900_ai_ci' })
  precio: string;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'varchar', length: 15, collation: 'utf8mb4_0900_ai_ci' })
  nro_documento: string;

  @Column({ type: 'varchar', length: 15, collation: 'utf8mb4_0900_ai_ci' })
  fecha: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  nro_factura?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  etiqueta?: string;

  @Column({ type: 'varchar', length: 100, collation: 'utf8mb4_0900_ai_ci' })
  tipo: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  cot_id?: string;

  @Column({ type: 'int', default: 0 })
  tiene_doc: number;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Prefactura',
    collation: 'utf8mb4_0900_ai_ci',
  })
  tipo_modal: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  nro_prefactura?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  respuesta_correo?: string;

  @Column({ type: 'int', default: 0 })
  pago: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_consumo?: Date;

  @Column({
    type: 'varchar',
    length: 5,
    default: '$',
    collation: 'utf8mb4_0900_ai_ci',
  })
  unidad: string;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha del valor del uf tomado',
  })
  fecha_uf?: Date;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  valor_uf?: string;

  @Column({ type: 'text', nullable: true, collation: 'utf8mb3_spanish_ci' })
  comment?: string;

  @Column({ type: 'int', nullable: true })
  id_primer_nivel?: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  id_segundo_nivel?: number;

  @ManyToOne(() => DataSegundoNivel)
  @JoinColumn({ name: 'id_segundo_nivel' })
  segundoNivel?: DataSegundoNivel;
}
