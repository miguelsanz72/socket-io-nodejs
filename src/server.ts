import cors from 'cors';
import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';

// Sockets
import * as configSocket from './sockets/sockets';

require('module-alias/register');
require('dotenv').config();

// Global
export const URI_DB = process.env.URIDB;
export const DB_NAME = process.env.DB_NAME;
export const URI_FRONT = process.env.LINK_FRONT;
const port = Number(process.env.PORT);

// DB
// ********

// Routes
import index from './routes/index.routes';

// import twilio from './routes/twilio.routes';
// Server
export default class NServer {
  private static _instance: NServer;

  public app: express.Application;
  public port: number;
  public io: Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = port;
    // Server
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer);
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

    this.io.on('connection', (client) => {
      this.io.emit('connected');
      // Conect User
      console.log('\x1b[0;33m Client Conected');
      // Disconnect
      configSocket.disconect(client);
    });
  }

  config(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ limit: '20mb', extended: true })); // TODO Averiguar que es esto
    this.app.use(express.json());
    this.app.use(cors({ origin: true, credentials: true }));
  }

  routes(): void {
    this.app.use('/', index);
  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }
}
