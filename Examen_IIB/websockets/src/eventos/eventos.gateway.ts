import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";

@WebSocketGateway(
    11202, //Puerto donde escucha el servidor de websocket
    {
        cors:{
            origin: '*',
        }
    }
)
export class EventosGateway{
    @SubscribeMessage('comprarGuitarra') // Nombre del metodo para recibir eventos
    devolverCantidad(
        @MessageBody()
            message: {nombre: string, mensaje: string },
        @ConnectedSocket()
            socket: Socket // import {Server, Socket} from 'socket.io';
    ) {
        // backend
        const mensajeSala = {
            nombre: message.nombre,
            mensaje: message.mensaje
        };
        socket.broadcast
            .emit('escucharEventoCantidad', //  Nombre evento que vamos a enviar a los clientes conectados
                 // OBJETO A ENVIAR
                    mensajeSala
                );
        return {mensaje: 'ok'}; // Callback del metodo "hola"
    }
}