import { Module } from '@nestjs/common';
import { UsersRolesController } from './users_roles.controller';
import { UsersRolesService } from './users_roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { UserRoles } from './users_roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoles]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [UsersRolesController],
  providers: [UsersRolesService, JwtStrategy],
  exports: [UsersRolesService],
})
export class UsersRolesModule {}
