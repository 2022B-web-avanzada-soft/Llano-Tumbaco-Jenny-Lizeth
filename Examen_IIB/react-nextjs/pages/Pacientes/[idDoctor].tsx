import Link from "next/link";
import Layout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {Doctor} from "../Doctores";

export interface Paciente{
    id:number,
    nombres_paciente:string,
    edad:string,
    telefono:string,
    fecha_cita:number,
    esta_afiliado:number
}
export default function (){
    const router = useRouter()
    //parámetros que llegan de la ruta
    const {idDoctor} = router.query

    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:11203/paciente?medico=${idDoctor}`).then((response) => {
            setPacientes(response.data);
        });
    }, []);

    const [doctor, setDoctor] = useState({} as Doctor);

    useEffect(() => {
        axios.get(`http://localhost:11203/medico/${idDoctor}`).then((response) => {
            setDoctor(response.data);
        });
    }, []);

    const deletePost = (pacienteId:number)=>{
        axios
            .delete(`http://localhost:11203/paciente/${pacienteId}`)
            .then(() => {
                alert("Paciente deleted!");
            });
    }

    return(
        <>
            <Layout title="Doctores">
                <div className="m-3">
                    <div>
                        <h2>{doctor.nombres}</h2>
                    </div>
                    <button type="button"
                            className="btn btn-primary">
                        <Link className="text-white" href="/Doctores">Regresar</Link>
                    </button>
                </div>
                {pacientes.length ? (
                    <table className="w-full bg-white shadow m-5 table-auto">
                        <thead className="bg-black text-white">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Telefono</th>
                            <th className="p-2">Edad</th>
                            <th className="p-2">Fecha de cita</th>
                            <th className="p-2">¿Está afiliado?</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pacientes.map((paciente)=>(
                            <tr className="border-b" key={paciente.id}>
                                <td>
                                    {paciente.nombres_paciente}
                                </td>
                                <td>
                                    {paciente.telefono}
                                </td>
                                <td>
                                    {paciente.edad}
                                </td>
                                <td>
                                    {paciente.fecha_cita}
                                </td>
                                <td>
                                    {paciente.esta_afiliado}
                                </td>
                                <td className="p-4 flex justify-center gap-3">
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"

                                    > <Link href={'/Pacientes/'+doctor.id+'/ActualizarPaciente/'+paciente.id}>Actualizar</Link>
                                    </button>
                                    <button type="submit"
                                            className="text-red-600 hover:text-blue-700 uppercase font-bold text-xs"
                                            onClick={(e)=>deletePost(paciente.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                ): (<p className="text-center mt-10"> No existe Pacientes</p> )}
                <div className="m-5">
                    <button type="button"
                            className="btn btn-primary">
                        <Link className="text-white" href={'/Pacientes/'+doctor.id+'/CrearPaciente/'}>Crear Paciente</Link>
                    </button>
                </div>
            </Layout>
        </>
    )
}