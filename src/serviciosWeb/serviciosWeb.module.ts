import { Module } from '@nestjs/common';
import { ServiciosWebController } from './serviciosWeb.controller';
import { ServiciosWebService } from './serviciosWeb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { ServiciosWeb } from './serviciosWeb.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ServiciosWeb]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [ServiciosWebController],
  providers: [ServiciosWebService, JwtStrategy],
  exports: [ServiciosWebService],
})
export class ServiciosWebModule {}
