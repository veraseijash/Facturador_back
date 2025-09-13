import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  UnauthorizedException,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidateUserResponse } from './dto/validate-user-response.dto';
import { JwtUserGuard } from './jwt-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import * as path from 'path';
import type { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtUserGuard)
  @Get('/list')
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('/order')
  getUsersOrder(): Promise<User[]> {
    return this.usersService.getUsersOrder();
  }

  @UseGuards(JwtUserGuard)
  @Get(':user_id')
  getUser(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.usersService.getUser(user_id);
  }

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createUser(@Body() newUser: CreateUsersDto) {
    return this.usersService.createUser(newUser);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':user_id')
  updateUser(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user_id, user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<ValidateUserResponse> {
    const userData = await this.usersService.validateUser(
      loginDto.user_name,
      loginDto.password,
    );

    if (!userData) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // userData ya tiene la forma: { user: { user_id, user_name, correo, country_id, token } }
    return userData;
  }

  @Post(':user_id/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req: any, file: Express.Multer.File, cb: Function) => {
          const ext = path.extname(file.originalname);
          const timestamp = new Date()
            .toISOString()
            .replace(/[-:.]/g, '')
            .slice(0, 12); // YYYYMMDDHHMM
          cb(null, `${timestamp}${ext}`);
        },
      }) as StorageEngine, // <-- FORZAMOS el tipo
      fileFilter: (req: any, file: Express.Multer.File, cb: Function) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadUserImage(
    @Param('user_id', ParseIntPipe) user_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: 'No se envió archivo' };
    }
    // Guardar el nombre del archivo en la tabla users
    return this.usersService.updateUserImage(user_id, file.filename);
  }
}
