import {IsIn, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class MedicoUpdateDto {
    @IsOptional()
    @IsString()
    nombres: string;

    @IsOptional()
    @IsString()
    especialidad: string;

    @IsOptional()
    @IsString()
    trabaja_fin_semana: string;

    @IsOptional()
    @IsNumber()
    costo_cita: number;

    @IsOptional()
    @IsNumber()
    horas_trabajo: number;
}