import { Module } from '@nestjs/common';
import { ValoresEconomicosController } from './valores_economicos.controller';
import { ValoresEconomicosService } from './valores_economicos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { ValoresEconomicos } from './valores_economicos.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ValoresEconomicos]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [ValoresEconomicosController],
  providers: [ValoresEconomicosService, JwtStrategy],
  exports: [ValoresEconomicosService],
})
export class ValoresEconomicosModule {}
