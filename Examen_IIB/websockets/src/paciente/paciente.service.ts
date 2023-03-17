import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource, FindManyOptions} from "typeorm";
import {PacienteEntity} from "./paciente.entity";

@Injectable()
export class PacienteService {
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}

    public pacienteRepository = this.datasource.getRepository(PacienteEntity);

    find(opciones:FindManyOptions<PacienteEntity>){
        return this.pacienteRepository.find(opciones)
    }
    findOneById(id:number){
        return this.pacienteRepository.findOne({
            //select[],
            where:{
                id:id
            },
        })
    }
    create(datosCrear:any){
        return this.pacienteRepository.save(datosCrear);
    }
    update(datosAcualizar:any, id:number){
        return this.pacienteRepository.save(
            {...datosAcualizar, id}
        );
    }
    delete(id:number){
        return this.pacienteRepository.delete(id);
    }

}