import express, { application, Application } from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import cors from 'cors';
import socketIO from 'socket.io';
import morgan from 'morgan';

// Sockets

import * as configSocket from '../src/sockets/sockets';

require('dotenv').config();

// Global
import { SERVER_PORT, SERVER_PORT_SSL } from './global/enviroments';

// Routes

import index from './routes/index.routes';

// Server

var key = fs.readFileSync('./src/encryption/privatekey.pem');
var cert = fs.readFileSync('./src/encryption/server.crt');
var ca = fs.readFileSync('./src/encryption/csr.pem');

var options = {
	key: key,
	cert: cert,
	ca: ca
};

export default class Server {
	private static _instance: Server;

	public app: express.Application;
	public port: number;
	public port_SSL: number;
	public io: socketIO.Server;
	// Server SSL
	private httpsServer: https.Server;
	// Server TSL
	private httpServer: http.Server;

	private constructor() {
		this.app = express();
		this.port = SERVER_PORT;
		this.port_SSL = SERVER_PORT_SSL;
		// Server SSL
		this.httpsServer = https.createServer(options, this.app);
		this.io = socketIO(this.httpsServer);
		// Server TSL
		this.httpServer = http.createServer(this.app);
		this.io = socketIO(this.httpServer);
		this.listenSockets();
		this.config();
		this.routes();
	}

	// Patron Singleton
	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	private listenSockets() {
		console.log('Listen Sockets');

		this.io.on('connection', client => {
			this.io.emit('connected');
			// Conect User
			console.log('\x1b[0;33m Client Conected');
			// Disconnect
			configSocket.disconect(client);
			// =================================================
			// Event from app Counter
			// =================================================
			configSocket.initialPosition(client, this.io);

			configSocket.positionBalon(client, this.io);

			configSocket.goal(client, this.io);

			configSocket.events(client, this.io);
		});
	}

	config(): void {
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(cors({ origin: true, credentials: true }));
	}

	routes(): void {
		this.app.use('/', index);
	}

	start(callback: any) {
		// this.httpsServer.listen(this.port_SSL, callback);
		this.httpServer.listen(this.port, callback);
	}
}
