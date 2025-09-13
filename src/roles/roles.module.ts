import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { Roles } from './roles.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Roles]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [RolesController],
  providers: [RolesService, JwtStrategy],
  exports: [RolesService],
})
export class RolesModule {}
