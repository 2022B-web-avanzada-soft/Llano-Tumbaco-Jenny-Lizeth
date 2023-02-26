import io from "socket.io-client"
import React, {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../components/mensaje";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
const servidorWebsocket = 'http://localhost:11202';
const socket = io(servidorWebsocket);

export interface FormularioModelo{
    nombre:string;
    mensaje:string;
}
export type MensajeSala = FormularioModelo;

export default function(){
    const [isConnected, setIsConnected] = useState(socket.connected)
    const inicioCantidad: MensajeChatProps = {
        mensaje: '10',
        nombre: 'Sistema'
    };
    const [mensajes, setMensajes] = useState([inicioCantidad] as MensajeChatProps[]);

    //Guitarra 1
    const [cantidad, setCantidad] = useState(10)

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            nombre: '',
            mensaje: '',
        },
        mode: 'all'
    })

    useEffect(
        () => {

            socket.on('connect', () => {
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log('No esta conectado');
            });
            socket.on('escucharEventoCantidad', (data: MensajeSala) => {
                const nuevoMensaje: MensajeChatProps = {
                    mensaje: data.mensaje,
                    nombre: data.nombre
                };
                setCantidad(parseInt(data.mensaje))
                setMensajes((mensajesAnteriores) => [nuevoMensaje]);
            });
        },
        []
    )
    const actualizarCantidadNumGuitarras = (data: FormularioModelo) => {
        const nuevoMensaje= {
            nombre: data.nombre,
            mensaje: (cantidad-parseInt(data.mensaje))
        };
        socket.emit(
            'comprarGuitarra', // Nombre Evento
            nuevoMensaje, //  Datos evento
            () => { // Callback o respuesta del evefnto
                const nuevoMensaje2:MensajeChatProps = {
                    mensaje: ''+(cantidad-parseInt(data.mensaje)),
                    nombre: data.nombre
                };
                setCantidad(cantidad-parseInt(data.mensaje))
                setMensajes((mensajesAnteriores) => [nuevoMensaje2]);
            }
        )
    }

    return (
        <>
          <Layout title="Formulario">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <img
                            className="rounded" width="500" height="325"
                            src="https://www.culturasonora.es/wp-content/uploads/2019/09/Yamaha-C40-1.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="col-sm-6 container">
                        <div className="row align-items-center">
                        <form onSubmit={handleSubmit(actualizarCantidadNumGuitarras)} className="row align-items-center">

                                <div className="mb-3 row align-items-center">
                                    {mensajes.map((mensaje, indice) =>
                                    <MensajeChat key={indice}
                                        mensaje={mensaje.mensaje}
                                        nombre={mensaje.nombre}
                                    />)
                                    }
                                </div>
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="mensaje" className="form-label">Ingrese la cantidad</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="EJ: 5"
                                        id="mensaje"
                                        {...register('mensaje')}
                                        aria-describedby="mensajeHelp"
                                    />
                                    {errors.mensaje &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errores {errors.mensaje.message}
                                        </div>
                                    }
                                </div>
                                <button type="submit"
                                    disabled={!isValid}
                                    className="btn btn-warning row align-items-center">
                                    Comprar Guitarra
                                </button>
                        </form>
                        </div>
                    </div>
                </div>

            </Layout>

            <hr />
        </>
    )
}
