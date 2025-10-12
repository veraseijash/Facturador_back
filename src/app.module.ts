import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersRolesModule } from './users_roles/users_roles.module';
import { RolesModule } from './roles/roles.module';
import { DataPrimerNivelModule } from './data_primer_nivel/data_primer_nivel.modules';
import { DataSegundoNivelModule } from './data_segundo_nivel/data_segundo_nivel.module';
import { DataTercerNivelModule } from './data_tercer_nivel/data_tercer_nivel.module';
import { ClientesModule } from './clientes/clientes.module';
import { StatusPrefacturaModule } from './status_prefactura/status_prefactura.module';
import { ServiciosWebModule } from './serviciosWeb/serviciosWeb.module';
import { ValoresEconomicosModule } from './valores_economicos/valores_economicos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Heg291215',
      database: 'itdchile_webdb2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    UsersRolesModule,
    RolesModule,
    DataPrimerNivelModule,
    DataSegundoNivelModule,
    DataTercerNivelModule,
    ClientesModule,
    StatusPrefacturaModule,
    ServiciosWebModule,
    ValoresEconomicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
