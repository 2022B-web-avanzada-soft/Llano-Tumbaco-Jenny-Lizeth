import Layout from "../components/Layout";
import {useState} from "react";
import {Crypto} from "next/dist/compiled/@edge-runtime/primitives/crypto";
import CryptoFormulario from "../components/f_ejemplo_monedas/CryptoFormulario";

export default function (){
    const [monedas, setMonedas] = useState({} as any);
    return(
        <>
            <Layout title="Ejemplo Criptomonedas|EPN">
                <CryptoFormulario setMonedas={setMonedas}>

                </CryptoFormulario>
            </Layout>
        </>
    )
}