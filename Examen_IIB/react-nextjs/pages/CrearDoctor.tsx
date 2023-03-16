import Link from "next/link";
import Layout from "../components/Layout";
import {useState} from "react";
import axios from "axios";

export default function (){
    const [data, setData] = useState({
        nombres:"",
        especialidad:"",
        trabaja_fin_semana:"",
        costo_cita:"",
        horas_trabajo:""
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
            nombres:data.nombres,
            especialidad:data.especialidad,
            trabaja_fin_semana:data.trabaja_fin_semana,
            costo_cita:parseInt(data.costo_cita),
            horas_trabajo:parseInt(data.horas_trabajo)
        };
        axios.post("http://localhost:11203/medico", userData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
        });
    };

    return(
        <>
            <Layout title="Doctores">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="flex justify-start text-gray-800"
                            htmlFor="nombres"
                        >Nombre:</label>
                        <input
                            id="nombres"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del doctor"
                            name="nombres"
                            value={data.nombres}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="especialidad"
                        >Especialidad:</label>
                        <input
                            id="especialidad"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Especialidad del doctor"
                            name="especialidad"
                            value={data.especialidad}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="trabaja_fin_semana"
                        >¿Trabaja fines de semana?:</label>
                        <input
                            id="trabaja_fin_semana"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Ejem: Si v No"
                            name="trabaja_fin_semana"
                            value={data.trabaja_fin_semana}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="costo_cita"
                        >Costo de la cita:</label>
                        <input
                            id="costo_cita"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 border-2 border-black"
                            placeholder="Ejm: 50.00"
                            name="costo_cita"
                            pattern="[0-9.0-9]{0,6}"
                            value={data.costo_cita}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className=" flex justify-start text-gray-800"
                            htmlFor="horas_trabajo"
                        >Horas de trabajo al día:</label>
                        <input
                            id="horas_trabajo"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 border-2 border-black"
                            placeholder="Ejm: 8.0"
                            name="horas_trabajo"
                            pattern="[0-9.0-9]{0,6}"
                            value={data.horas_trabajo}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit"
                            className="btn btn-warning">
                        Crear Doctor
                    </button>
                </form>
                <button type="button"
                        className="btn btn-warning">
                    <Link href="/Doctores">Regresar</Link>
                </button>
            </Layout>
        </>
    )
}