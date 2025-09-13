import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FindOperator } from 'typeorm';
@Entity({ name: 'roles' })
export class Roles {
  @PrimaryGeneratedColumn()
  role_id: number | FindOperator<number>;
  @Column('varchar', { length: 100, nullable: false })
  description: string;
  @Column('varchar', { length: 100, nullable: false })
  role_name: string;
}
