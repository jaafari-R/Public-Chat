import express, { Express } from 'express';

import { config } from './config';
import { Routes } from './routes';

export class PublicChatServer {
    app: Express;
    
    constructor() {
        this.app = express();

        this.router();
        this.standardMiddleWare();
        this.securityMiddleWare();

    }

    private router() {
        Routes(this.app);
    }

    private standardMiddleWare() {

    }

    private securityMiddleWare() {

    }

    public start() {
        this.app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    }
}