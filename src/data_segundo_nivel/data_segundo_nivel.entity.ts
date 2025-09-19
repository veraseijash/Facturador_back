import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Data_primer_nivel } from 'src/data_primer_nivel/data_primer_nivel.entity';
import { DataTercerNivel } from 'src/data_tercer_nivel/data_tercer_nivel.entity';

@Entity('data_segundo_nivel')
export class DataSegundoNivel {
  @PrimaryColumn({ type: 'int', unsigned: true, default: 0 })
  id_segundo_nivel: number;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb3_spanish_ci' })
  cuenta: string;

  @Column({ type: 'varchar', length: 15, collation: 'utf8mb4_0900_ai_ci' })
  nro_documento: string;

  @Column({ type: 'varchar', length: 15, collation: 'utf8mb4_0900_ai_ci' })
  fecha: string;

  @Column({ type: 'int', nullable: true })
  totalFacturado: number | null;

  @Column({ type: 'int', nullable: true })
  totalPendiente: number | null;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'int' })
  cantidadTotal: number;

  @Column({ type: 'int' })
  cantidadFacturada: number;

  @Column({ type: 'varchar', length: 100, collation: 'utf8mb4_0900_ai_ci' })
  tipo: string;

  @Column({ type: 'int', nullable: true })
  id_primer_nivel: number | null;

  @ManyToOne(() => Data_primer_nivel, (primerNivel) => primerNivel.dataSegundos)
  @JoinColumn({ name: 'id_primer_nivel' })
  primerNivel: Data_primer_nivel;

  @OneToMany(() => DataTercerNivel, (tercerNivel) => tercerNivel.segundoNivel)
  dataTerceros: DataTercerNivel[];
}
