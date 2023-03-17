import Link from "next/link";
import Layout from "../../../../components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {Doctor} from "../../../Doctores";
import {useRouter} from "next/router";
import {Paciente} from "../../[idDoctor]";

export default function (){
    const router = useRouter()
    //parámetros que llegan de la ruta
    const {idDoctor, idPaciente} = router.query
    const [doctor, setDoctor] = useState({} as Doctor);
    const [paciente, setPaciente] = useState({} as Paciente);

    useEffect(() => {
        axios.get(`http://localhost:11203/paciente/${idPaciente}`).then((response) => {
            setPaciente(response.data);
        });
    }, []);

    const [data, setData] = useState({
        nombres_paciente:paciente.nombres_paciente,
        telefono:paciente.telefono,
        edad:paciente.edad,
        fecha_cita:paciente.fecha_cita,
        esta_afiliado:paciente.esta_afiliado,
        medico:idDoctor
    });

    const handleChange = (e) => {
        var value = e.target.value;
        if(e.target.name=="edad"){
            value = parseInt(value)
        }
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            nombres_paciente:data.nombres_paciente,
            telefono:data.telefono,
            edad:data.edad,
            fecha_cita:data.fecha_cita,
            esta_afiliado:data.esta_afiliado,
            medico:idDoctor
        };
        axios.put(`http://localhost:11203/paciente/${idPaciente}`, userData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
        });
    };

    return(
        <>
            <Layout title="Doctores">
                <div>
                    <button type="button"
                            className="btn btn-warning m-3">
                        <Link href={'/Pacientes/'+idDoctor}>Regresar</Link>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="m-5">
                    <div className="mb-4">
                        <label
                            className="flex justify-start text-gray-800"
                            htmlFor="nombres_paciente"
                        >Nombre:</label>
                        <input
                            id="nombres"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del paciente"
                            name="nombres_paciente"
                            defaultValue={paciente.nombres_paciente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="telefono"
                        >Telefono:</label>
                        <input
                            id="telefono"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono"
                            name="telefono"
                            defaultValue={paciente.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="edad"
                        >Edad:</label>
                        <input
                            id="edad"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Edad"
                            name="edad"
                            defaultValue={paciente.edad}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="fecha_cita"
                        >Fecha de la cita:</label>
                        <input
                            id="fecha_cita"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 border-2 border-black"
                            placeholder="Ejm: 02-02-2023"
                            name="fecha_cita"
                            defaultValue={paciente.fecha_cita}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="esta_afiliado"
                        >¿Está afiliado?:</label>
                        <input
                            id="esta_afiliado"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 border-2 border-black"
                            placeholder="Ejm: Si v No"
                            name="esta_afiliado"
                            defaultValue={paciente.esta_afiliado}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <button type="submit"
                                className="btn btn-warning m-5">
                            Actualizar pacientes
                        </button>
                    </div>

                </form>
            </Layout>
        </>
    )
}
