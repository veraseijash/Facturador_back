import { Module } from '@nestjs/common';
import { DataTercerNivelService } from './data_tercer_nivel.service';
import { DataTercerNivelController } from './data_tercer_nivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { DataTercerNivel } from './data_tercer_nivel.entity';
import { DataSegundoNivel } from '../data_segundo_nivel/data_segundo_nivel.entity';
import { DataPrimerNivelModule } from '../data_primer_nivel/data_primer_nivel.modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataTercerNivel, DataSegundoNivel]),
    DataPrimerNivelModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [DataTercerNivelController],
  providers: [DataTercerNivelService, JwtStrategy],
  exports: [DataTercerNivelService],
})
export class DataTercerNivelModule {}
