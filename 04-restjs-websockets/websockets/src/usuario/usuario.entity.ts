import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {NotaEntity} from "../nota/nota.entity";

@Entity('epn_usuario') //nombre tablas
export class UsuarioEntity{
    //id autogenerado
    @PrimaryGeneratedColumn()
    id:number;
    //columna en la bdd
    @Column({
        name:'user_nombres',//'nombre campo bdd'
        type:'varchar',//tipo campo bdd
        length: 60,//longitud campo bdd
        nullable:false,//si es nullable
    })
    nombres:string;//nombre campo

    @Column({
        name:'user_apellidos',//'nombre campo bdd'
        type:'varchar',//tipo campo bdd
        length: 60,//longitud campo bdd
        nullable:false,//si es nullable
    })
    apellidos:string;//nombre campo

    @Column({
        name: 'user_rol',//'nombre campo bdd'
        type: 'varchar',//tipo campo bdd
        length: 1,//longitud campo bdd
        nullable: false,//si es nullable
        default: 'U',//valor por defecto
        //comentario en la bdd
        comment:'U=Usuario; A=Administrador'
    })
    rol:string;//nombre campo

    @OneToMany(
        () => NotaEntity, //Entidad hija
        (instanciaNotaEntity) =>
            instanciaNotaEntity.usuario)
    notas:NotaEntity[]
}