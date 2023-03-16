import {IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class MedicoCreateDto {
    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsString()
    especialidad: string;

    @IsNotEmpty()
    @IsString()
    trabaja_fin_semana: string;

    @IsNotEmpty()
    @IsNumber()
    costo_cita: number;

    @IsNotEmpty()
    @IsNumber()
    horas_trabajo: number;
}