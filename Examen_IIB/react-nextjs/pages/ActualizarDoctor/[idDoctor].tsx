import Link from "next/link";
import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {Doctor} from "../Doctores";
import {useRouter} from "next/router";
export default function (){
    const router = useRouter()
    //parámetros que llegan de la ruta
    const {idDoctor} = router.query
    const [doctor, setDoctor] = useState({} as Doctor);

    useEffect(() => {
        axios.get(`http://localhost:11203/medico/${idDoctor}`).then((response) => {
            setDoctor(response.data);
        });
    }, []);

    const [data, setData] = useState({
        nombres:doctor.nombres,
        especialidad:doctor.especialidad,
        trabaja_fin_semana:doctor.trabaja_fin_semana,
        costo_cita:doctor.costo_cita,
        horas_trabajo:doctor.horas_trabajo
    });

    const handleChange = (e) => {
        var value = e.target.value;
        if(e.target.name=="costo_cita"){
            value = parseFloat(value)
        }
        if(e.target.name == "horas_trabajo"){
            value = parseFloat(value)
        }
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
            costo_cita:data.costo_cita,
            horas_trabajo:data.horas_trabajo
        };
        axios.put(`http://localhost:11203/medico/${idDoctor}`, userData).then((response) => {
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
                        <Link href="/Doctores">Regresar</Link>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="m-5">
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
                            defaultValue={doctor.nombres}
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
                            defaultValue={doctor.especialidad}
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
                            defaultValue={doctor.trabaja_fin_semana}

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
                            defaultValue={doctor.costo_cita}
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
                            defaultValue={doctor.horas_trabajo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit"
                                className="btn btn-warning m-5">
                            Actualizar Datos
                        </button>
                    </div>

                </form>
        </Layout>
        </>
)
}
