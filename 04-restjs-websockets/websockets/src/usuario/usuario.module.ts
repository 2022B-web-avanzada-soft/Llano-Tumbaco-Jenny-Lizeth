import {UsuarioEntity} from "./usuario.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [UsuarioEntity],//medico en este modulo
        ),
    ],
    providers:[UsuarioService],
    exports:[UsuarioService],
    controllers:[UsuarioController]
})
export class UsuarioModule{

}