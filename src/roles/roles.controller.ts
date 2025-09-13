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
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles';
import { JwtUserGuard } from '../users/jwt-user.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(JwtUserGuard)
  @Patch(':role_id')
  updateRoles(
    @Param('role_id', ParseIntPipe) role_id: number,
    @Body() role: UpdateRolesDto,
  ) {
    return this.rolesService.updateRoles(role_id, role);
  }

  @UseGuards(JwtUserGuard)
  @Post('/insert')
  createRoles(@Body() newRole: CreateRolesDto) {
    return this.rolesService.createRoles(newRole);
  }

  @UseGuards(JwtUserGuard)
  @Get('/:role_id')
  getRolesId(@Param('role_id', ParseIntPipe) role_id: number) {
    return this.rolesService.getRolesId(role_id);
  }

  @UseGuards(JwtUserGuard)
  @Delete(':role_id')
  async deleteRole(@Param('role_id', ParseIntPipe) role_id: number) {
    return await this.rolesService.deleteRole(role_id);
  }
}
