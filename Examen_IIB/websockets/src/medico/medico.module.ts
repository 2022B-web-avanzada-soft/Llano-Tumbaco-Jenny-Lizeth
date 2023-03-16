import {MedicoEntity} from "./medico.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicoService} from "./medico.service";
import {MedicoController} from "./medico.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [MedicoEntity],//medico en este modulo
        ),
    ],
    providers:[MedicoService],
    exports:[MedicoService],
    controllers:[MedicoController]
})
export class MedicoModule {

}