import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventosModule} from "./eventos/eventos.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicoEntity} from "./medico/medico.entity";
import {MedicoModule} from "./medico/medico.module";
import {PacienteEntity} from "./paciente/paciente.entity";
import {PacienteModule} from "./paciente/paciente.module";

@Module({
  imports: [//importamos otros modulos
    EventosModule,
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'./bdd/bdd.sqlite',
      entities:[
        MedicoEntity,
          PacienteEntity
      ],//entidades en el aplicativo
      synchronize: true,//true->edita las columna y tablas //false-> nada
      dropSchema:false,//true->borra toda la base de datos //false->nada
    }),
    MedicoModule,
      PacienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{

}
