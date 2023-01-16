import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect} from "react";
import {MONEDAS} from "./Monedas";

export default function () {
    const [moneda, UseSelectMonedas] = useSelectMoneda(
        'Moneda',
        MONEDAS

    )
    useEffect(
        ()=>{
            console.log('Cambio de moneda', moneda)
        },
        [moneda]
    )
    return(<>{UseSelectMonedas}</>)
}