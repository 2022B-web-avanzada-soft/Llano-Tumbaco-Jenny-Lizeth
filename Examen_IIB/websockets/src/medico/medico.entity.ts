import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";

@Entity('medico') //nombre tablas
export class MedicoEntity {
    //id autogenerado
    @PrimaryGeneratedColumn()
    id:number;
    //columna en la bdd
    @Column({
        name:'medico_nombres',//'nombre campo bdd'
        type:'varchar',//tipo campo bdd
        length: 60,//longitud campo bdd
        nullable:false,//si es nullable
    })
    nombres:string;//nombre campo

    @Column({
        name:'especialidad',//'nombre campo bdd'
        type:'varchar',//tipo campo bdd
        length: 60,//longitud campo bdd
        nullable:false,//si es nullable
    })
    especialidad:string;//nombre campo

    @Column({
        name: 'trabaja_fin_semana',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length:2,
        nullable: false,//si es nullable
    })
    trabaja_fin_semana:string;//nombre campo

    @Column({
        name: 'costo_cita',//'nombre campo bdd'
        type: 'float',
        nullable: false,//si es nullable
    })
    costo_cita:number;//nombre campo

    @Column({
        name: 'horas_trabajo',//'nombre campo bdd'
        type: 'int',//tipo campo bdd
        nullable: false,//si es nullable
    })
    horas_trabajo:number;//nombre campo

    @OneToMany(
        () => PacienteEntity, //Entidad hija
        (instanciaPacienteEntity) =>
            instanciaPacienteEntity.medico, {onDelete:'CASCADE'})
    pacientes:PacienteEntity[]
}