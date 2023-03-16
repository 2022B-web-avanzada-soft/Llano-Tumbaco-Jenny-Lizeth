import {Module} from "@nestjs/common";
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente.entity";

@Module({
    controllers:[PacienteController],
    providers:[PacienteService],
    exports:[PacienteService],
    imports:[TypeOrmModule.forFeature(
        [PacienteEntity],'default'//nombre cadena conexión
    )]
})
export class PacienteModule {

}