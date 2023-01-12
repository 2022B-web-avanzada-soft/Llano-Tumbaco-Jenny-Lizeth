import {MonedasInterface} from "../../interfaces/moneda";
import {useState} from "react";

export default function (label: string, opciones:MonedasInterface[]){
    //select del arreglo de moneda (html-jsx element)+
    //valor de esa moneda
    const [moneda, setMoneda] = useState('');
    //devuelve un jsx element
    const generarJSXElementMonedas: () => JSX.Element[] = () =>{
        return opciones.map(
            (moneda)=>
                ( //en una iteración el KEY es requerido
                    <option key={moneda.id} id={moneda.id} value={moneda.id}>
                        {moneda.nombre}
                    </option>
                )
        )
    };

    const UseSelectMoneda = (
        <>
            <label className="form-label" htmlFor={label}>{label}</label>
            <select className="form-select" name={label} id={label} value={moneda} onChange={e => {
                e.preventDefault();
                setMoneda(e.target.value)
            }}>
                <option value=""> Seleccione opción</option>
                {generarJSXElementMonedas()}
            </select>
        </>
    )



    return [moneda, UseSelectMoneda];
}
