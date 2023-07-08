import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './config';
import { Routes } from './routes';

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
    }

    public start() {
        this.app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    }
}