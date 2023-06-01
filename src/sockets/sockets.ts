import { Socket, Server } from 'socket.io';

export const disconect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client Disconnect');
    });
};

// Liesten User Conected
export const loginWs = (client: Socket, io: Server) => {
    client.on('loginUser', (payload: { userName: string }, callback: Function) => {
        callback({
            ok: true,
            message: `User Logged ${payload.userName}`,
        });
        io.emit('userLogged', payload);
    });
};
