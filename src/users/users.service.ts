import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

interface ValidateUserResponse {
  user: {
    user_id: number;
    user_name: string;
    correo: string;
    country_id: number;
    image: string;
    token: string;
    role_name: string;
  };
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtUserService: JwtService,
  ) {}
  async createUser(users: CreateUsersDto): Promise<any> {
    const userFond = await this.usersRepository.findOne({
      where: {
        user_name: users.user_name,
      },
    });

    if (userFond) {
      return new HttpException(
        'Ya existe un usuario con ese nombre de usuario',
        HttpStatus.CONFLICT,
      );
    }
    const saltRounds = 10;
    users.passwordb = await bcrypt.hash(users.password, saltRounds);
    const newUser = this.usersRepository.create(users);
    return this.usersRepository.save(newUser);
  }
  getUsers() {
    return this.usersRepository.find({
      relations: ['roles', 'roles.role'],
    });
  }
  getUsersOrder() {
    return this.usersRepository.find({
      order: {
        user_name: 'ASC',
      },
    });
  }
  async validateUser(
    user_name: string,
    pass: string,
  ): Promise<ValidateUserResponse | null> {
    const user = await this.usersRepository.findOne({
      where: { user_name },
      relations: ['roles', 'roles.role'],
    });
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.passwordb);
    if (!isMatch) return null;

    const payload = { user_id: user.user_id, name: user.user_name };
    const token = this.jwtUserService.sign(payload);

    // Extraer role_name(s) de roles
    const roleName = user.roles?.[0]?.role.role_name || '';

    const userResponse: ValidateUserResponse = {
      user: {
        user_id: Number(user.user_id),
        user_name: user.user_name,
        correo: user.correo,
        country_id: user.country_id,
        image: user.image,
        token,
        role_name: roleName,
      },
    };

    return userResponse;
  }
  async getUser(user_id: number) {
    const userFound = await this.usersRepository.findOne({
      where: {
        user_id,
      },
      relations: ['roles', 'roles.role'],
    });

    if (!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }
  async updateUser(user_id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: { user_id },
    });

    if (!userFound) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const userFondN = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.user_id != :user_id', { user_id })
      .andWhere('user.user_name = :user_name', { user_name: user.user_name })
      .getOne();

    if (userFondN) {
      throw new HttpException(
        'Ya existe un usuario con ese nombre de usuario',
        HttpStatus.CONFLICT,
      );
    }

    const updateUser = Object.assign(userFound, user);
    return this.usersRepository.save(updateUser);
  }
  async generatePasswordBForAll(): Promise<void> {
    const users = await this.usersRepository.find();

    const saltRounds = 10;

    for (const user of users) {
      if (!user.password) continue; // saltar si no tiene password

      const hashed = await bcrypt.hash(user.password, saltRounds);
      user.passwordb = hashed;

      await this.usersRepository.save(user);
    }
  }
  async updateUserImage(user_id: number, filename: string) {
    const user = await this.usersRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) throw new Error('Usuario no encontrado');

    user.image = filename;
    await this.usersRepository.save(user);

    return { message: 'Imagen actualizada', filename };
  }
}
