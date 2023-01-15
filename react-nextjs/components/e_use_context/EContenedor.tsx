import {ContenedorContext, ContenedorContextObject} from "./ContenedorContext";
import {useState} from "react";
import EComponenteA from "./EComponenteA";
export default function (){
    const [nombreUsuario, setNombreUsuario] = useState("Jenny")
    const objetoContenedorContext: ContenedorContextObject = {nombreUsuario, setNombreUsuario};
    return (
        <>
            <ContenedorContext.Provider value={objetoContenedorContext}>
                <EComponenteA></EComponenteA>
            </ContenedorContext.Provider>
        </>
    )
}