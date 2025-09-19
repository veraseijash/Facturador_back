import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from 'src/clientes/clientes.entity';
import { DataSegundoNivel } from 'src/data_segundo_nivel/data_segundo_nivel.entity';
@Entity({ name: 'data_primer_nivel' })
export class Data_primer_nivel {
  @PrimaryGeneratedColumn()
  id_primer_nivel: number;
  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  nro_documento: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  razon_social: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  fecha: string;
  @Column('int', { nullable: false })
  id_cliente: number;
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
  @Column('int', { nullable: true })
  totalFacturado: number;
  @Column('int', { nullable: true })
  totalPendiente: number;
  @Column('int', { default: 0, nullable: true })
  status: number;
  @Column('int', { default: 0, nullable: false })
  cantidadTotal: number;
  @Column('int', { default: 0, nullable: false })
  cantidadFacturada: number;
  @Column('int', { default: 0, nullable: true })
  total_consumido: number;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  tipo: string;
  @Column({ type: 'tinyint', width: 1, default: 0, nullable: false })
  sinConsumo: boolean;
  @Column({ type: 'tinyint', width: 1, default: 0, nullable: false })
  tiene_doc: boolean;
  @Column({ type: 'tinyint', width: 1, default: 0, nullable: false })
  comment: boolean;
  @OneToMany(() => DataSegundoNivel, (segundoNivel) => segundoNivel.primerNivel)
  dataSegundos: DataSegundoNivel[];
}
