import { Express } from 'express';
import { authRoutes } from './routes/auth';
import { chatRoutes } from './routes/chat';

const BASE_URL: string = '/api/v1'

export const Routes = (app: Express) => {
    app.use('/test', (req, res) => {res.send("Hello")})

    app.use(BASE_URL, authRoutes.routes());
    app.use(BASE_URL, chatRoutes.routes());
}