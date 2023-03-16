import {Body, Controller, Delete, Get, HttpCode, Param, Post} from "@nestjs/common";
import {PacienteService} from "./paciente.service";

@Controller('paciente')
export class PacienteController {
    constructor(
        private readonly pacienteService: PacienteService
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
    async find(){
        return this.pacienteService.find({});
    }
    @Delete("/:id") // DELETE /medico/:id
    @HttpCode(200)
    delete(
        @Param() params // {id:1, idNota:12}
    ) {
        return this.pacienteService.delete(+params.id);
    }
}