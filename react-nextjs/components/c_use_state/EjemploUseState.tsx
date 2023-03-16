import {useEffect, useState} from "react";
import {event} from "next/dist/build/output/log";

interface Usuario{
    nombre: string;
    edad: number;
    casado:boolean;
    hijos?:number[]
}
export default function (){
    const [numero, setNumero] = useState(0);
    const [nombre, setNombre] = useState("");
    const [arregloNumeros, setArregloNumeros] = useState([1,2,3] as number[]);
    const [usuario, setUsuario] = useState({
        nombre:"Jenny",
        edad: 22,
        casado: true,
    } as Usuario)

    //ayuda a escuchar los cambios de las variables
    useEffect(
        ()=>{
            console.log('Inicio el componente', numero, usuario);
        },
        [] //arreglo variables
        //si está vacío se ejecuta una vez
    );
    useEffect(
        ()=>{
            console.log('Cambio número', numero);
        },
        [numero] //arreglo variables
    );
    useEffect(
        ()=>{
            console.log('Cambio arregloNumeros', arregloNumeros);
        },
        [arregloNumeros] //arreglo variables
    );
    useEffect(
        ()=>{
            console.log('Cambio medico', usuario);
        },
        [usuario] //arreglo variables
    );
    useEffect(
        ()=>{
            console.log('Cambio todo', numero, arregloNumeros, usuario);
        },
        [numero, arregloNumeros, usuario] //arreglo variables
    );

    //setUsuario({nombre:"Liz",edad:22,casado:false, hijos: []})
    return (<>
        <button className="bg-blue-500 m-5" onClick={(event)=>{
            event.preventDefault();
            setNumero(numero+1);
        }}>Numero</button>
        <button className="bg-blue-500 m-5" onClick={(event)=>{
            event.preventDefault();
            setArregloNumeros([...arregloNumeros,1])
        }}>Arreglo</button>
        <button className="bg-blue-500 m-5" onClick={(event)=>{
            event.preventDefault();
            let usuarioNuevo = {...usuario, nombre: new Date().toString()};
            setUsuario(usuarioNuevo);
        }
        }>Usuario</button>
    </>)
}