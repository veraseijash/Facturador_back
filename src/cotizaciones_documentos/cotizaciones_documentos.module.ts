import { Module } from '@nestjs/common';
import { CotizacionesDocumentosController } from './cotizaciones_documentos.controller';
import { CotizacionesDocumentosService } from './cotizaciones_documentos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { CotizacionesDocumentos } from './cotizaciones_documentos.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CotizacionesDocumentos]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [CotizacionesDocumentosController],
  providers: [CotizacionesDocumentosService, JwtStrategy],
  exports: [CotizacionesDocumentosService],
})
export class CotizacionesDocumentosModule {}
