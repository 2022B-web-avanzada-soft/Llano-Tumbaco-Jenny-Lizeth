import Link from "next/link";
import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
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
                alert("Post deleted!");
            });
    }
    if (!doctores) return null;

    return(
        <>
            <Layout title="Doctores">
                <button type="button"
                        className="btn btn-warning">
                    <Link href="/CrearDoctor">Crear Doctor</Link>
                </button>
            </Layout>
            {
                doctores.map((doctor)=>(
                    <tr className="border-b">
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
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"

                        > <Link href={`/${doctor.id}/ActualizarDoctor`}>Actualizar</Link>
                        </button>
                        <button type="submit"
                                className="text-red-600 hover:text-blue-700 uppercase font-bold text-xs"
                                onClick={(e)=>deletePost(doctor.id)}>
                            Eliminar
                        </button>
                    </tr>
                ))
            }
        </>
    )
}