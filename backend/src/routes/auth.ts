import express, { Router } from 'express';

import { SignUp } from '../controllers/auth/signup';
import { SignIn } from '../controllers/auth/signin';
import { VerifyJWT } from '../controllers/auth/verifyJWT';

class AuthRoutes {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes() {
        this.router.post('/signup', SignUp.prototype.create);
        this.router.post('/signin', SignIn.prototype.signin);
        this.router.post('/verifyjwt', VerifyJWT.prototype.verifyToken);

        return this.router;
    }
}

export const authRoutes = new AuthRoutes();