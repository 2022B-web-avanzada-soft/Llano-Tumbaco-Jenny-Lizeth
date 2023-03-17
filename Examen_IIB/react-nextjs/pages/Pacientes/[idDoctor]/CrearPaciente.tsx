import Link from "next/link";
import Layout from "../../../components/Layout";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function (){
    const router = useRouter()
    //parámetros que llegan de la ruta
    const {idDoctor} = router.query

    const [data, setData] = useState({
        nombres_paciente:"",
        telefono:"",
        edad:"",
        fecha_cita:"",
        esta_afiliado:"",
        medico:idDoctor
    });

    const handleChange = (e) => {
        const value = e.target.value;
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
            edad:parseInt(data.edad),
            fecha_cita:data.fecha_cita,
            esta_afiliado:data.esta_afiliado,
            medico:idDoctor
        };
        axios.post("http://localhost:11203/paciente", userData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
        });
    };

    return(
        <>
            <Layout title="Doctores">

                <div className="">
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
                            value={data.nombres_paciente}
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
                            value={data.telefono}
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
                            value={data.edad}
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
                            value={data.fecha_cita}
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
                            value={data.esta_afiliado}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <button type="submit"
                                className="btn btn-warning m-5">
                            Crear pacientes
                        </button>
                    </div>

                </form>

            </Layout>
        </>
    )
}