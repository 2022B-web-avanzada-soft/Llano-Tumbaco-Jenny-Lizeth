import io from "socket.io-client"
import {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../components/i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
const servidorWebsocket = 'htt://localhost:8080';
const socket = io(servidorWebsocket);

export interface FormularioModelo{
    salaId: string;
    nombre:string;
    mensaje:string;
}
export default function(){
    const [isConnected, setIsConnected] = useState(socket.connect)
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);

    const {control, register, handleSubmit, formState:{errors,isValid}} = useForm({
        defaultValues:{
            salaId:'',
            nombre:'',
            mensaje:'',
        },
        mode:'all'
    })

    useEffect(
        ()=>{
            socket.on('connect',()=>{
                setIsConnected(true);
                console.log('Si esta conectado');
            });
            socket.on('disconnect', () =>{
                setIsConnected(false);
                console.log('No está conectado');
            });
            socket.on('escucharEventHola',(data:{mensaje:string})=>{
                console.log('escucharEventoHola');
                const nuevoMensaje: MensajeChatProps={
                    mensaje:data.mensaje,
                    nombre:'Sistema',
                    posicion:'I'
                }
                setMensajes((mensajesAnteriores)=>[...mensajesAnteriores, nuevoMensaje])
            });
            socket.on('escucharEventoUnirseSala',(data:{mensaje:string})=>{
                console.log('escucharEventoUnirseSala');
            });
            socket.on('escucharEventoMensajeSala',(data:{mensaje:string})=>{
                console.log('escucharEventoMensajeSala');
            });
        },
        []
    )

    const enviarEventoHola = () => {
        const nuevoMensaje: MensajeChatProps = {
            mensaje:'Adrian',
            nombre: 'Sistema',
            posicion:'I'
        };
        socket.emit(
            'hola', //Nombre evento
            nuevoMensaje, //datos evento
            (datosEventoHola) => {//calback o respuesta del evento
                console.log(datosEventoHola) //{mensaje:'ok'}
                setMensajes((mensajesAnteriores)=>[...mensajesAnteriores, nuevoMensaje]);
            }
        )
    }

    const unirseSala0EnviarMensajeASala = (data:FormularioModelo) =>{
        if(data.mensaje !== ''){
            //unimos a la sala
            const dataEventoUnirseSala ={
                salaId:data.salaId,
                nombre:data.nombre,
            }
            socket.emit(
                'unirseSala',//nombre eventi
                dataEventoUnirseSala,//datos evento
                ()=>{//callback o respuesta del evento
                    const nuevoMensaje: MensajeChatProps={mensaje:'Bienvenido a la sala'+dataEventoUnirseSala.salaId,
                    nombre:'Sistema',
                    posicion:'I'
                    };
                    setMensajes((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])

                }
            )
        }else{
            //mandamos mensaje
            const dataEventoEnviarMensajeSala = {
               salaId:data.salaId,
               nombre:data.nombre,
               mensaje:data.mensaje
            };
            socket.emit(
                'enviarMensaje',//nombre eventi
                dataEventoEnviarMensajeSala,//datos evento
                ()=>{//callback o respuesta del evento
                    const nuevoMensaje: MensajeChatProps={
                        mensaje:data.salaId+'-'+data.mensaje,
                        nombre:data.nombre,
                        posicion:'D'
                    };
                    setMensajes((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje])

                }
            )
        }
    }

    return(<>
        <Layout title="Formulario">
            <h1>Websockets</h1>
            <button className={'btn btn-success'} onClick={()=>enviarEventoHola()}>Enviar evento hola</button>
            <div className="row">
                <div className="col-sm-6">
                    <h1>Formulario</h1>
                    <div className ="row">
                        <div className="col-sm-6">
                            <form onSubmit={handleSubmit(unirseSala0EnviarMensajeASala)}>
                                <div className="mb-3">
                                    <label htmlFor="salaId" className="form-label">Sala ID</label>
                                    <input type="text"
                                    className="form-control"
                                    placeholder="Ej:1234"
                                    id="salaId"
                                           {...register('salaId',{required:'IngresarSalaId'})}
                                        aria-describedby="salaIdHelp"/>
                                    <div id="salaIdHelp" className="form-text">
                                        Ingresa tu idSala
                                    </div>
                                    {errors.salaId &&
                                    <div className="alert alert-warning" role="alert">
                                        Tiene errore {errors.salaId.message}
                                    </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Sala ID</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Ej:1234"
                                           id="nombre"
                                           {...register('nombre',{required:'IngresarNombre'})}
                                           aria-describedby="nombreHelp"/>
                                    <div id="nombreHelp" className="form-text">
                                        Ingresa tu idSala
                                    </div>
                                    {errors.salaId &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errore {errors.nombre.message}
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Sala ID</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Ej:1234"
                                           id="mensaje"
                                           {...register('mensaje',{required:'IngresarMensaje'})}
                                           aria-describedby="mensajeHelp"/>
                                    <div id="mensajeHelp" className="form-text">
                                        Ingresa tu idSala
                                    </div>
                                    {errors.salaId &&
                                        <div className="alert alert-warning" role="alert">
                                            Tiene errore {errors.mensaje.message}
                                        </div>
                                    }
                                </div>
                                <button type="submit"
                                    disabled={!isValid}
                                className="btn btn-warning">
                                    Unirse Sala
                                </button>
                                <button type="reset"
                                        className="btn btn-danger">
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col.sm.6">
                    {mensajes.map((mensaje,indice)=>
                    <MensajeChat key={indice}
                            mensaje={mensaje.mensaje}
                        nombre={mensaje.nombre}
                        posicion={mensaje.posicion}
                        />)
                    }
                </div>

            </div>
        </Layout>
    </>)
}
