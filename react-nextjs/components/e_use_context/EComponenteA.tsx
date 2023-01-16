import {useContext, useEffect} from "react";
import {ContenedorContext} from "./ContenedorContext";
import EComponenteB from "./EComponenteB";

export default function (){
    const contenedorContexto = useContext(ContenedorContext)

    useEffect(()=>{
        console.log('Cambio en algún lado del nombre',contenedorContexto.nombreUsuario)
    },
        [contenedorContexto.nombreUsuario]

        )
    return (
        <>
            Componente A
            <p>{contenedorContexto.nombreUsuario}</p>
            <button className={"bg-blue-50 m-2"} onClick={e=>{
                e.preventDefault();
                contenedorContexto.setNombreUsuario('CompA')
            }}>
                Actualizar
            </button>
            <EComponenteB></EComponenteB>
        </>
    )
}
