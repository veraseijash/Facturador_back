import { Module } from '@nestjs/common';
import { DataSegundoNivelService } from './data_segundo_nivel.service';
import { DataSegundoNivelController } from './data_segundo_nivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { DataSegundoNivel } from './data_segundo_nivel.entity';
import { Data_primer_nivel } from '../data_primer_nivel/data_primer_nivel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataSegundoNivel, Data_primer_nivel]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [DataSegundoNivelController],
  providers: [DataSegundoNivelService, JwtStrategy],
  exports: [DataSegundoNivelService],
})
export class DataSegundoNivelModule {}
