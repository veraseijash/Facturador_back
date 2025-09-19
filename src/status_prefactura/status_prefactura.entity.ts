import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Data_primer_nivel } from 'src/data_primer_nivel/data_primer_nivel.entity';

@Entity({ name: 'status_prefactura' })
@Index('idx_status_prefactura_id_primer_nivel', ['id_primer_nivel'])
export class StatusPrefactura {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  id_primer_nivel: number;

  @Column({ type: 'varchar', length: 20, collation: 'latin1_swedish_ci' })
  color_status: string;

  @Column({ type: 'date' })
  fecha_cambio: Date;

  @Column({ type: 'varchar', length: 45, collation: 'latin1_swedish_ci' })
  user_name: string;

  @Column({ type: 'varchar', length: 12, collation: 'utf8mb4_0900_ai_ci' })
  nro_documento: string;

  @ManyToOne(() => Data_primer_nivel, (d) => d.statusPrefacturas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_primer_nivel' })
  dataPrimerNivel: Data_primer_nivel;
}
