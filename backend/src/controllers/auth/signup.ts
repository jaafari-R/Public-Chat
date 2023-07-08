import { Request, Response } from "express";
import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { authModel } from "../../services/redis/auth";
import { Auth } from "../../interfaces/auth";
import { config } from "../../config";
import { userModel } from "../../services/redis/user";
import { User } from "../../interfaces/user";

export class SignUp {
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const userExists: boolean = await authModel.authExists(username);
        if(userExists) {
            console.log(`user "${username}" already exists`);
            res.status(409).json({ success: false, msg: 'Uername is already used' });
            return;
        }

        /* Create new user Auth */
        const userId: string = crypto.randomUUID();
        const authData: Auth = {
            userId,
            password
        };
        authModel.createUserAuth(authData, username);

        /* Create new User */
        const userData: User = {
            userId,
            username
        }
        userModel.createUser(userData);

        /* Create JWT and set it as cookie */
        jwt.sign({ username }, config.JWT_SECRET, { algorithm: 'HS512', expiresIn: '1d'}, (err, token) => {
            if(err) {
                console.log("JWT ERROR", err);
                res.send('JWT error');
                return;
            }

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(200).json({ success: true, username });
        })
    }
}