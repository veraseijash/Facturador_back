import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/jwt.constants';
import { JwtStrategy } from '../users/jwt.strategy';
import { Cliente } from './clientes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [ClientesController],
  providers: [ClientesService, JwtStrategy],
  exports: [ClientesService],
})
export class ClientesModule {}
