import {ContenedorContext, ContenedorContextObject} from "./ContenedorContext";
import {useEffect, useState} from "react";
import EComponenteA from "./EComponenteA";
export default function (){
    const [nombreUsuario, setNombreUsuario] = useState("Jenny")
    const objetoContenedorContext: ContenedorContextObject = {nombreUsuario, setNombreUsuario};
    useEffect(()=>{
            console.log('Cambio en el contenedor',objetoContenedorContext.nombreUsuario)
        },
        [objetoContenedorContext.nombreUsuario]

    )
    return (
        <>
            <ContenedorContext.Provider value={objetoContenedorContext}>
                <EComponenteA></EComponenteA>
            </ContenedorContext.Provider>
        </>
    )
}