import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from './users_roles.entity';
import { Repository } from 'typeorm';
import { CreateUsersRolesDto } from './dto/create-user_roles.dto';
import { UpdateUsersRolesDto } from './dto/update-user_roles.dto';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UserRoles)
    private usersRolesRepository: Repository<UserRoles>,
  ) {}
  async createUserRoles(userRoles: CreateUsersRolesDto): Promise<any> {
    return this.usersRolesRepository.save(userRoles);
  }
  async updateUserRoles(user_role_id: number, userRoles: UpdateUsersRolesDto) {
    const userRolesFound = await this.usersRolesRepository.findOne({
      where: {
        user_role_id,
      },
    });
    if (!userRolesFound) {
      return new HttpException(
        'Roles de usuario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    const userRolesWaypay = Object.assign(userRolesFound, userRoles);
    return this.usersRolesRepository.save(userRolesWaypay);
  }
  async getUserRolesUserId(user_id: number) {
    const userRolesFound = await this.usersRolesRepository.find({
      where: { user_id },
      relations: ['role'],
    });
    if (!userRolesFound) {
      return new HttpException(
        'lista de roles no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return userRolesFound;
  }
  async deleteUserRole(user_role_id: number) {
    const role = await this.usersRolesRepository.findOne({
      where: { user_role_id },
    });

    if (!role) {
      throw new HttpException(
        `El rol con id ${user_role_id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.usersRolesRepository.remove(role);

    return { message: `Rol ${user_role_id} eliminado correctamente` };
  }
}
