import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from "@nestjs/common";
import {PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";
import {FindManyOptions, FindOptionsWhere, Like} from "typeorm";
import {MedicoEntity} from "../medico/medico.entity";
import {MedicoService} from "../medico/medico.service";
import {response} from "express";
import {MedicoUpdateDto} from "../medico/dto/medico-update.dto";
import {validate} from "class-validator";
import {PacienteUpdateDto} from "./dto/paciente-update.dto";
@Controller('paciente')
export class PacienteController {
    constructor(
        private readonly pacienteService: PacienteService,
        private readonly medicoService: MedicoService
    ) {
    }
    @Post("/")
    @HttpCode(201)
    async create(
        @Body() bodyParams
    ){
        return this.pacienteService.create(bodyParams)
    }
    @Get("/")
    @HttpCode(200)
    async find(
        @Query() queryParams
    ){
        const consulta: FindManyOptions<PacienteEntity> = {
            //select: ['id'], //select
            relations: ['medico'],
            //notas:true
            //},
            skip: queryParams.skip ? + queryParams.skip:0, //2*0=0,2*1=2,2*2=4
            take: queryParams.take?+queryParams.take:10
        };
        const consultaWhere = [] as FindOptionsWhere<PacienteEntity>[]
        //si es que nos mandaron nombre entonces se ejecuta la consulta
        var c=new MedicoEntity()
            await this.medicoService.findOneById(+queryParams.medico).then((response)=>{

                c=response
                if(queryParams.medico){
                    consultaWhere.push({
                        medico:response,
                    })
                }
                if(consultaWhere.length >0){
                    consulta.where = consultaWhere
                }
            })
        return this.pacienteService.find(consulta);
    }
    @Get("/:id")
    @HttpCode(200)
    async findOneById(
        @Param() params
    ){
        return this.pacienteService.findOneById(+params.id);
    }
    @Delete("/:id") // DELETE /medico/:id
    @HttpCode(200)
    delete(
        @Param() params // {id:1, idNota:12}
    ) {
        return this.pacienteService.delete(+params.id);
    }

    @Put("/:id") // PUT /medico/:id
    @HttpCode(200)
    async update(
        @Param() params, // {id:1}
        @Body() bodyParams // {nombres:''....}
    ) {
        const nuevoRegistro = new PacienteUpdateDto();
        nuevoRegistro.nombres_paciente = bodyParams.nombres_paciente;
        nuevoRegistro.edad = bodyParams.edad;
        nuevoRegistro.telefono = bodyParams.telefono;
        nuevoRegistro.fecha_cita = bodyParams.fecha_cita;
        nuevoRegistro.esta_afiliado = bodyParams.esta_afiliado;
        const arregloErrores = await validate(
            nuevoRegistro
        ); // validamos
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.pacienteService.update(
            bodyParams,
            +params.id
        );
    }
}