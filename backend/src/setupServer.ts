import express, { Express } from 'express';
import cors from 'cors';

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
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }

    public start() {
        this.app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    }
}