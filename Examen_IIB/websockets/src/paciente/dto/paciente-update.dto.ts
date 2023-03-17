import {IsIn, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class PacienteUpdateDto {
    @IsOptional()
    @IsString()
    nombres_paciente: string;

    @IsOptional()
    @IsString()
    telefono: string;

    @IsOptional()
    @IsString()
    fecha_cita: string;

    @IsOptional()
    @IsNumber()
    edad: number;

    @IsOptional()
    @IsString()
    esta_afiliado: string;

    @IsOptional()
    @IsNumber()
    doctor:number;
}