import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('serviciosweb')
export class ServiciosWeb {
  @PrimaryGeneratedColumn()
  ser_id: number;
  @Column({
    name: 'ser_servicio',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  ser_servicio: string;

  @Column({ name: 'ser_estado', type: 'int', nullable: false })
  ser_estado: number;

  @Column({ name: 'precios_cargados', type: 'int', default: 0 })
  precios_cargados: number;

  @Column({ name: 'country_id', type: 'int', nullable: false })
  country_id: number;

  @Column({
    name: 'tipo_servicio',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  tipo_servicio: string;
}
