import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MedicoEntity} from "../medico/medico.entity";

@Entity('paciente')
export class PacienteEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name: 'paciente_nombre',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length:60,
        nullable: false,//si es nullable
    })
    nombres_paciente:string;//nombre campo

    @Column({
        name: 'sexo',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length:10,
        nullable: false,//si es nullable
    })
    sexo:string;//nombre campo

    @Column({
        name: 'edad',//'nombre campo bdd'
        type: 'int',//tipo campo bdd
        nullable: false,//si es nullable
    })
    edad:number;//nombre campo

    @Column({
        name: 'fecha_cita',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length:20,
        nullable: false,//si es nullable
    })
    fecha_cita:string;//nombre campo

    @Column({
        name: 'esta_afiliado',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length:2,
        nullable: false,//si es nullable
    })
    esta_afiliado:string;//nombre campo

    @ManyToOne(
        ()=> MedicoEntity, //Entidad papá
        (instanciaMedicoEntity)=>//campo relacional
        instanciaMedicoEntity.pacientes,
        {
            onDelete:'CASCADE'
        }
    )
    medico:MedicoEntity
}