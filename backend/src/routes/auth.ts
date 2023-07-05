import express, { Router } from 'express';
import { SignUp } from '../controllers/auth/signup';

class AuthRoutes {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes() {
        this.router.post('/signup', SignUp.prototype.create);

        return this.router;
    }
}

export const authRoutes = new AuthRoutes();