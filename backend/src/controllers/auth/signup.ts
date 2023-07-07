import { Request, Response } from "express";
import crypto from 'crypto';

import { authModel } from "../../services/redis/auth";
import { Auth } from "../../interfaces/auth";

export class SignUp {
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const userExists: boolean = await authModel.authExists(username);
        if(userExists) {
            console.log(`user "${username}" already exists`);
            res.send("FAIL");
            return;
        }
        const userId: string = crypto.randomUUID();

        const authData: Auth = {
            userId,
            password
        };

        authModel.saveUserAuth(authData, username);
        res.send('user created successfully');
    }
}