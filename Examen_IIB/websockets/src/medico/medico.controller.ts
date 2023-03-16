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
import {MedicoService} from "./medico.service";
import {MedicoCreateDto} from "./dto/medico-create.dto";
import {MedicoUpdateDto} from "./dto/medico-update.dto";
import {validate} from "class-validator";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {MedicoEntity} from "./medico.entity";
@Controller('medico')
// http://localhost:3000/usuario/
// @Controller('medico/asd/qwe')
// http://localhost:3000/usuario/asd/qwe
export class MedicoController {
    constructor(
        private readonly medicoService: MedicoService
    ) {
    }

    @Get("/:id") // GET /medico/1
    @HttpCode(200)
    findOneById(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.medicoService.findOneById (+params.id); // +"1" = 1
    }

    @Get("/") // GET /usuario/
    @HttpCode(200)
    find(
        @Query() queryParams
    ) {
        const consulta: FindManyOptions<MedicoEntity> = {
            relations: ['pacientes'],
            skip: queryParams.skip ? +queryParams.skip : 0 , // 2 * 0 = 0 ; 2 * 1 = 2; 2 * 2 = 4;
            take: queryParams.take ? +queryParams.take : 10
        };
        const consultaWhere = [] as FindOptionsWhere<MedicoEntity>[]
        if(consultaWhere.length > 0){
            consulta.where = consultaWhere
        }
        return this.medicoService.find(consulta);

    }

    @Delete("/:id") // DELETE /medico/:id
    @HttpCode(200)
    delete(
        // "/:id/notas/:idNota"
        @Param() params // {id:1, idNota:12}
    ) {
        return this.medicoService.delete(+params.id);
    }

    @Put("/:id") // PUT /medico/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new MedicoUpdateDto();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.especialidad = bodyParams.especialidad;
        nuevoRegistro.costo_cita = bodyParams.costo_cita;
        nuevoRegistro.horas_trabajo = bodyParams.horas_trabajo;
        nuevoRegistro.trabaja_fin_semana = bodyParams.trabaja_fin_semana;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.medicoService.update(
            bodyParams,
            +params.id
        );
    }

    @Post("/") // POST /medico
    @HttpCode(201)
    async create(
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new MedicoCreateDto();
        nuevoRegistro.nombres = bodyParams.nombres;
        nuevoRegistro.especialidad = bodyParams.especialidad;
        nuevoRegistro.costo_cita = bodyParams.costo_cita;
        nuevoRegistro.horas_trabajo = bodyParams.horas_trabajo;
        nuevoRegistro.trabaja_fin_semana = bodyParams.trabaja_fin_semana;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.medicoService.create(nuevoRegistro);
    }
}