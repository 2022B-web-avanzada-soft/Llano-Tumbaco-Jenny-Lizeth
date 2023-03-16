import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {MedicoEntity} from "./medico.entity";
import {DataSource, FindManyOptions} from "typeorm";
import {MedicoCreateDto} from "./dto/medico-create.dto";
import {MedicoUpdateDto} from "./dto/medico-update.dto";

@Injectable()
export class MedicoService {
    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}

    public medicoRepository = this.datasource.getRepository(MedicoEntity);
    find(opciones: FindManyOptions<MedicoEntity>) {
        return this.medicoRepository.find(opciones)
    }
    findOneById(id: number) {
        return this.medicoRepository.findOne({
            // select:{ },
            where: {
                id: id
            },
        })
    }
    create(datosCrear: MedicoCreateDto) {
        return this.medicoRepository.save(datosCrear);
    }
    update(datosActualizar: MedicoUpdateDto, id: number) {
        return this.medicoRepository.save(
            {...datosActualizar, id}
        );
    }
    delete(id: number) {
        return this.medicoRepository.delete(id);
    }



}