import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FindOperator } from 'typeorm';
import { UserRoles } from '../users_roles/users_roles.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number | FindOperator<number>;
  @Column('varchar', { length: 45, nullable: true })
  user_name: string;
  @Column('varchar', { length: 60, nullable: true })
  password: string;
  @Column('varchar', { length: 60, nullable: true })
  passwordb: string;
  @Column('int', { default: 0, nullable: false })
  country_id: number;
  @Column({ type: 'tinyint', width: 1, default: 1, nullable: false })
  activo: boolean;
  @Column('varchar', { length: 300, nullable: true })
  correo: string;
  @Column('varchar', { length: 10, nullable: true })
  type_user: string;
  @Column('varchar', { length: 10, nullable: true })
  format: string;
  @Column('smallint', { default: 0, nullable: false })
  numDec: number;
  @Column('varchar', { length: 100, nullable: true })
  image: string;
  @OneToMany(() => UserRoles, (userRole) => userRole.user)
  roles: UserRoles[];
}
