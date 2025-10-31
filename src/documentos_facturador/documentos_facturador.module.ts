import { Module } from '@nestjs/common';
import { DocumentosFacturadorController } from './documentos_facturador.controller';
import { DocumentosFacturadorService } from './documentos_facturador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { DocumentosFacturador } from './documentos_facturador.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentosFacturador]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [DocumentosFacturadorController],
  providers: [DocumentosFacturadorService, JwtStrategy],
  exports: [DocumentosFacturadorService],
})
export class DocumentosFacturadorModule {}
