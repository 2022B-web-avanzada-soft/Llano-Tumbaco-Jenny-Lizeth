import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param, Post, Put, Query,
    UnauthorizedException
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {UsuarioUpdateDto} from "./dto/usuario-update.dto";
import {validate} from "class-validator";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
@Controller('usuario')
// http://localhost:3000/usuario/
// @Controller('medico/asd/qwe')
// http://localhost:3000/usuario/asd/qwe
export class UsuarioController{
    constructor(
        private readonly usuarioService: UsuarioService
    ) {
    }

    @Get("/:id") // GET /medico/1
    @HttpCode(200)
    findOneById(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.usuarioService.findOneById (+params.id); // +"1" = 1
    }

    @Delete("/:id") // DELETE /medico/:id
    @HttpCode(200)
    delete(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.usuarioService.delete(+params.id);
    }

    @Put("/:id") // PUT /medico/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioUpdateDto();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.apellidos = bodyParams.apellidos;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/") // POST /medico
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new UsuarioCreateDto();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.apellidos = bodyParams.apellidos;
        nuevoRegistro.rol = bodyParams.rol;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.usuarioService.create(nuevoRegistro);
    }

    @Get("/") //get/medico
    @HttpCode(200)
    find(
        @Query() queryParams
    ){
        const consulta: FindManyOptions<UsuarioEntity> = {
            //select: ['id'], //select
            //reations: {//relaciones
            //notas:true
            //},
            skip: queryParams.skip ? + queryParams.skip:0, //2*0=0,2*1=2,2*2=4
            take: queryParams.take?+queryParams.take:10
        };
        const consultaWhere = [] as FindOptionsWhere<UsuarioEntity>[]
        //si es que nos mandaron nombre entonces se ejecuta la consulta
        if(queryParams.nombres){
            consultaWhere.push({
                nombres:queryParams.nombres,
                rol:queryParams.rol? queryParams.rol:undefined,
            })
        }
        if(queryParams.apellidos){
            consultaWhere.push({
                apellidos:Like('%'+queryParams.apellidos+'%'),
                rol:queryParams.rol? queryParams.rol:undefined,
            })
        }

        if(consultaWhere.length >0){
            consulta.where = consultaWhere
        }

        return this.usuarioService.find(consulta);
    }
}