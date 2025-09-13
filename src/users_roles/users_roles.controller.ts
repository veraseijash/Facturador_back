import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { CreateUsersRolesDto } from './dto/create-user_roles.dto';
import { UpdateUsersRolesDto } from './dto/update-user_roles.dto';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('usersRoles')
export class UsersRolesController {
  constructor(private usersRolesService: UsersRolesService) {}

  @UseGuards(JwtUserGuard)
  @Get('/list/:user_id')
  getUser(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.usersRolesService.getUserRolesUserId(user_id);
  }

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createUserRoles(@Body() newUser: CreateUsersRolesDto) {
    return this.usersRolesService.createUserRoles(newUser);
  }

  @UseGuards(JwtUserGuard)
  @Patch(':user_role_id')
  updateUserRoles(
    @Param('user_role_id', ParseIntPipe) user_role_id: number,
    @Body() user: UpdateUsersRolesDto,
  ) {
    return this.usersRolesService.updateUserRoles(user_role_id, user);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':user_role_id')
  async deleteUserRole(
    @Param('user_role_id', ParseIntPipe) user_role_id: number,
  ) {
    return await this.usersRolesService.deleteUserRole(user_role_id);
  }
}
