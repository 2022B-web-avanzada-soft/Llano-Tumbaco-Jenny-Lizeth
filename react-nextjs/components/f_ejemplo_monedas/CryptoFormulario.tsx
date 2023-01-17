import {useEffect, useState} from "react";
import {MONEDAS} from "../d_hook_custom/Monedas";
import {MonedasInterface} from "../../interfaces/moneda";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {ConsultaMoneda} from "../../pages/f_ejemplo_criptomonedas";

export default function (params){
    const {setMonedas} = params
    const [monedasArreglo, setMonedasArreglo]=useState(MONEDAS)
    const [criptoMonedasArreglo, setCriptoMonedasArreglo] = useState([]as MonedasInterface[])
    const [valorMoneta, SelectMonedaComponente] = useSelectMoneda(
        'Seleccionar Moneda',
        monedasArreglo
    );
    const [valorCriptoMoneda, SelectCriptoMonedaComponente]=useSelectMoneda(
        'Seleccionar Criptomoneda',
        criptoMonedasArreglo
    );

    useEffect(
        ()=>{
            const consultarAPICripto = async ()=>{
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
                const respuesta = await fetch(url);
                const dataPlana = await respuesta.json()
                const arregloCriptos = dataPlana.Data.map(
                    (criptoMoneda) => {
                        const criptoMonedaLocal:MonedasInterface={
                            id:criptoMoneda.CoinInfo.Name,
                            nombre:criptoMoneda.CoinInfo.FullName,
                        }
                        return criptoMonedaLocal
                    }
                );
                setCriptoMonedasArreglo(arregloCriptos);
            }
            consultarAPICripto().then().catch((error)=>{
                console.error(error)
            });
        },
        []
    )

    const manejarSubmitFormulario = (e) => {
        e.preventDefault();
        const monedasConsulta: ConsultaMoneda = {
            valorCriptoMoneda:valorCriptoMoneda as string,
            valorMoneda: valorMoneta as string
        }
        setMonedas(monedasConsulta)
    }

    return(
        <>
            <form onSubmit={manejarSubmitFormulario}>
                {SelectMonedaComponente} //si cambia algo de aqui
                {SelectCriptoMonedaComponente}//entonces va a cambiar aqui
                <br/>
                <button className={"btn btn-primary w-100"} type={'submit'}>
                    Consultar
                </button>
            </form>
        </>
    )
}