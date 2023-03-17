import Link from "next/link";
import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export interface Doctor{
    id:number,
    nombres:string,
    especialidad:string,
    trabaja_fin_semana:string,
    costo_cita:number,
    horas_trabajo:number
}
export default function (){
    const [doctores, setDoctores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:11203/medico").then((response) => {
            setDoctores(response.data);
        });
    }, []);
    const deletePost = (doctorId:number)=>{
        axios
            .delete(`http://localhost:11203/medico/${doctorId}`)
            .then(() => {
                alert("Doctor deleted!");
            });
    }
    if (!doctores) return null;

    return(
        <>
            <Layout title="Doctores">
                <div className="m-3">
                    <button type="button"
                            className="btn btn-primary">
                        <Link className="text-white" href="/CrearDoctor">Crear Doctor</Link>
                    </button>
                </div>
                {doctores.length ? (
                    <table className="w-full bg-white shadow m-5 table-auto">
                        <thead className="bg-black text-white">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Especialidad</th>
                            <th className="p-2">¿Trabaja fines de semana?</th>
                            <th className="p-2">Costo por cita</th>
                            <th className="p-2">Horas de trabajo al día</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctores.map((doctor)=>(
                                <tr className="border-b" key={doctor.id}>
                                    <td>
                                        {doctor.nombres}
                                    </td>
                                    <td>
                                        {doctor.especialidad}
                                    </td>
                                    <td>
                                        {doctor.trabaja_fin_semana}
                                    </td>
                                    <td>
                                        {doctor.costo_cita}
                                    </td>
                                    <td>
                                        {doctor.horas_trabajo}
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"

                                        > <Link href={'/ActualizarDoctor/'+doctor.id}>Actualizar</Link>
                                        </button>
                                        <button type="submit"
                                                className="text-red-600 hover:text-blue-700 uppercase font-bold text-xs"
                                                onClick={(e)=>deletePost(doctor.id)}>
                                            Eliminar
                                        </button>
                                        <button type="submit"
                                                className="text-red-600 hover:text-blue-700 uppercase font-bold text-xs"
                                        >
                                            <Link href={'/Pacientes/'+doctor.id}>Ver pacientes</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                ): (<p className="text-center mt-10"> No existe Doctores</p> )}

            </Layout>

        </>
    )
}