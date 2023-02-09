import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway(
    8080, //Puerto donde escucha el servidor de websocket
    {
        cors:{
            origin: '*',
        }
    }
)
export class EventosGateway{
    @SubscribeMessage('Hola')
    devolverHola(
        @MessageBody()
            message:{mensaje:string},
        @ConnectedSocket()
            socket: Socket
    ){
        console.log("message",message);
        socket.broadcast //broadcat->todos los clientes conectados y que estén escuchando el evento "escucharEventoHola" les llega el mensaje
            .emit(
                'escucharEventoHola',//nombre evento que vamos a enviar a los clientes conectados
                {
                    mensaje:'Bienvenidos'+message.mensaje
                });
        return {mensaje:'ok'}//callback del método hola
    }

    @SubscribeMessage('unirseSala')//nombre metodo
    unirseSala(
        @MessageBody()
            message:{salaId:string, nombre:string},
        @ConnectedSocket()
            socket: Socket
    ){
        socket.join(message.salaId) //socket.join agrupa a los clientes de websockes
                                    //egún un identificador al unirse a una sala
                                    //podemos escuchar los mensajes de esa sala
        const mensajeDeBienvenidaSala ={
            mensaje:`Bienvenidos ${message.nombre} a la sala ${message.salaId}`};
            socket.broadcast
                .to(message.salaId) //manda el mensaje a un grupo en específico según el identificadr
                .emit('EscucharEventoUnirseSala', //los que escuhchan el evento en ete grupo
                    mensajeDeBienvenidaSala); //reciben el mensaje

        return {mensaje:'ok'}//callback del método hola
    }

    @SubscribeMessage('enviarMensaje')//nombre metodo
    enviarMensaje(
        @MessageBody()
            message:{salaId:string, nombre:string, mensaje:string},
        @ConnectedSocket()
            socket: Socket
    ){

        const mensajeSala ={
            nombre: message.nombre,
            mensaje: message.mensaje,
            salaId: message.salaId
        };
        socket.broadcast
            .to(message.salaId) //sala a la que enviamos el mensaje
            .emit('EscucharEventoMensajeSala', //nombre del evento y datos a enviar
                mensajeSala);

        return {mensaje:'ok'}//callback del método hola
    }


}