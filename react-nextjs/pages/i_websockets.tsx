import io from "socket.io-client"
import {useEffect, useState} from "react";
import MensajeChat, {MensajeChatProps} from "../components/i_websockets/MensajeChat";
import {useForm} from "react-hook-form";
import Layout from "../components/Layout";
const servidorWebsocket = 'htt://localhost:8080';
const socket = io(servidorWebsocket);
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

    return(<>
        <Layout title="Formulario">
            <h1>Websockets</h1>
            <button className={'btn btn-success'} onClick={()=>enviarEventoHola()}>Enviar evento hola</button>
            <div className="row">
                <div className="col-sm-6">
                    Formulario
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
