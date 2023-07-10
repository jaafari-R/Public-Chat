import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { authModel } from "../../services/redis/auth";
import { Auth } from "../../interfaces/auth";
import { config } from "../../config";

export class SignIn {
    public async signin(req: Request, res: Response) {
        const { username, password } = req.body;

        const userId = await authModel.getUserIdByUsername(username);
        if(userId == '') {
            return res.status(401).send({
                success: false,
                msg: 'Invalid Credentials'
            });
        }

        const authData: Auth = { userId, password };
        const validPassword = await authModel.comparePassword(authData);

        if(!validPassword) {
            return res.status(401).send({
                success: false,
                msg: 'Invalid Credentials'
            });
        }
        
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

            res.status(200).json({
                success: true,
                username 
            });
        });
    }
}