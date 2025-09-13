import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FindOperator } from 'typeorm';
import { User } from '../users/users.entity';
import { Roles } from '../roles/roles.entity';
@Entity({ name: 'users_roles' })
export class UserRoles {
  @PrimaryGeneratedColumn()
  user_role_id: number | FindOperator<number>;
  @Column('int', { default: 1, nullable: false })
  user_id: number;
  @Column('int', { default: 1, nullable: false })
  role_id: number;
  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // indica la FK en la tabla users_roles
  user: User;
  @ManyToOne(() => Roles, { eager: true }) // eager: true carga automáticamente el rol
  @JoinColumn({ name: 'role_id' })
  role: Roles;
}
