import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import { config } from './config';
import { Routes } from './routes';
import { authMiddleware } from './middleware/auth';

export class PublicChatServer {
    app: Express;
    
    constructor() {
        this.app = express();

        this.standardMiddleWare();
        this.securityMiddleWare();
        this.router();
    }

    private router() {
        Routes(this.app);
    }

    private standardMiddleWare() {
        this.app.use(express.json());
    }

    private securityMiddleWare() {
        this.app.use(cors({
            origin: 'http://127.0.0.1:3000',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
        this.app.use(cookieParser());
        this.app.use(authMiddleware);
    }

    public async start() {
        const server = http.createServer(this.app);
        const io = await this.createSocketIO(server);
        this.startHttpServer(server);
        this.socketIOConnections(io);
    }

    private startHttpServer(server: http.Server) {
        server.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    }

    private async createSocketIO(server: http.Server) {
        const io = new Server(server);

        return io
    }

    private socketIOConnections(io: Server) {
        io.on('connection', (socket) => {
            console.log('A user connected.');
        })
    }
}