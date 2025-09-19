import { Module } from '@nestjs/common';
import { StatusPrefacturaController } from './status_prefactura.controller';
import { StatusPrefacturaService } from './status_prefactura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { StatusPrefactura } from './status_prefactura.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([StatusPrefactura]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [StatusPrefacturaController],
  providers: [StatusPrefacturaService, JwtStrategy],
  exports: [StatusPrefacturaService],
})
export class StatusPrefacturaModule {}
