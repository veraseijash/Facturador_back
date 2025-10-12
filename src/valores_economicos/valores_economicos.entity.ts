import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'valores_economicos' }) // <-- nombre real de la tabla
export class ValoresEconomicos {
  @PrimaryGeneratedColumn()
  id_valor: number;

  @Column({
    name: 'uf',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  uf: string;

  @Column({ type: 'date', nullable: false })
  fecha: Date;
}
