import {Module} from "@nestjs/common";
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente.entity";
import {MedicoEntity} from "../medico/medico.entity";
import {MedicoService} from "../medico/medico.service";

@Module({
    controllers:[PacienteController, PacienteController],
    providers:[PacienteService, MedicoService],
    exports:[PacienteService, PacienteService],
    imports:[TypeOrmModule.forFeature(
        [PacienteEntity,MedicoEntity],'default'//nombre cadena conexión
    )]
})
export class PacienteModule {

}