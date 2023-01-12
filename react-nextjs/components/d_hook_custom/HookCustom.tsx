import useSelectMoneda from "../hooks/useSelectMoneda";
import {useEffect} from "react";

export default function () {
    const [moneda, UseSelectMonedas] = useSelectMoneda(
        'Moneda',
        [
            {id: 'USD', nombre: 'Dolar Estados Unidos'},
            {id: 'MXN', nombre: 'Peso mexicano'},
            {id: 'EUR', nombre: 'Euro'},
            {id: 'GDP', nombre: 'Libra esterlina'},
        ]
    )
    useEffect(
        ()=>{
            console.log('Cambio de moneda', moneda)
        },
        [moneda]
    )
    return(<>{UseSelectMonedas}</>)
}