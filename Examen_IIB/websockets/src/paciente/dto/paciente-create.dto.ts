import {IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class PacienteCreateDto {
    @IsNotEmpty()
    @IsString()
    nombres_paciente: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsString()
    fecha_cita: string;

    @IsNotEmpty()
    @IsNumber()
    edad: number;

    @IsNotEmpty()
    @IsString()
    esta_afiliado: string;

    @IsNotEmpty()
    @IsNumber()
    doctor: number;
}