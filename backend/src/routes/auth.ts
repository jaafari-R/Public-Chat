import express, { Router } from 'express';

import { SignUp } from '../controllers/auth/signup';
import { SignIn } from '../controllers/auth/signin';

class AuthRoutes {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes() {
        this.router.post('/signup', SignUp.prototype.create);
        this.router.post('/signin', SignIn.prototype.signin);

        return this.router;
    }
}

export const authRoutes = new AuthRoutes();