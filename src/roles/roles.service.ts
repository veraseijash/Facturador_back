import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { Repository } from 'typeorm';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async createRoles(Roles: CreateRolesDto): Promise<any> {
    return this.rolesRepository.save(Roles);
  }
  async updateRoles(role_id: number, Roles: UpdateRolesDto) {
    const rolesFound = await this.rolesRepository.findOne({
      where: {
        role_id,
      },
    });
    if (!rolesFound) {
      return new HttpException('Roles no encontrado', HttpStatus.NOT_FOUND);
    }
    const rolesWaypay = Object.assign(rolesFound, Roles);
    return this.rolesRepository.save(rolesWaypay);
  }
  async getRolesId(role_id: number) {
    const rolesFound = await this.rolesRepository.find({
      where: { role_id },
    });
    if (!rolesFound) {
      return new HttpException('Roles no encontrado', HttpStatus.NOT_FOUND);
    }
    return rolesFound;
  }
  async deleteRole(role_id: number) {
    const role = await this.rolesRepository.findOne({
      where: { role_id },
    });

    if (!role) {
      throw new HttpException(
        `El rol con id ${role_id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.rolesRepository.remove(role);

    return { message: `Rol ${role_id} eliminado correctamente` };
  }
}
