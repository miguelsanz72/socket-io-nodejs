import { Socket } from 'socket.io';

export const disconect = (client: Socket) => {
	client.on('disconnect', () => {
		console.log('Client Disconnect');
	});
};

// Liesten User Conected
export const loginWs = (client: Socket, io: SocketIO.Server) => {
	client.on('loginUser', (payload: { userName: string }, callback: Function) => {
		callback({
			ok: true,
			message: `User Logged ${payload.userName}`
		});
		io.emit('userLogged', payload);
	});
};

// =================================================
// events from app Counter
// =================================================

export const initialPosition = (client: Socket, io: SocketIO.Server) => {
	client.on('posicion', (payload: { data: any }) => {
		io.emit('posicionar', payload);
	});
};
export const positionBalon = (client: Socket, io: SocketIO.Server) => {
	client.on('posicionBalon', (payload: { data: any }) => {
		io.emit('espera_silbato', payload);
	});
};
export const goal = (client: Socket, io: SocketIO.Server) => {
	client.on('goalPosition', (payload: { data: any }) => {
		io.emit('goal', payload);
	});
};
export const listPalyers = (client: Socket, io: SocketIO.Server) => {
	client.on('listPalyers', (payload: { data: any }) => {
		io.emit('jugadores', payload);
	});
};
export const events = (client: Socket, io: SocketIO.Server) => {
	client.on('eventos', (data: string) => {
		let evento = data;
		console.log(evento);

		io.emit(evento, data);
	});
};
