import express, { Express } from 'express';

import { config } from './config';

export class PublicChatServer {
    app: Express;
    
    constructor() {
        this.app = express();

        this.router();
        this.standardMiddleWare();
        this.securityMiddleWare();

    }

    private router() {
        this.app.use('/', (req, res) => res.send("HELLO"))
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