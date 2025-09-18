import { Module } from '@nestjs/common';
import { DataPrimerNivelService } from './data_primer_nivel.service';
import { DataPrimerNivelController } from './data_primer_nivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { Data_primer_nivel } from './data_primer_nivel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Data_primer_nivel]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [DataPrimerNivelController],
  providers: [DataPrimerNivelService, JwtStrategy],
  exports: [DataPrimerNivelService],
})
export class DataPrimerNivelModule {}
