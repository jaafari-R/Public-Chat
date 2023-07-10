import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { authModel } from "../../services/redis/auth";
import { config } from "../../config";

export class VerifyJWT {
    public async verifyToken(req: Request, res: Response): Promise<void> {
        const { token } = req.cookies.token;

        // verify token
        try {
            const payload = jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS512']}) as jwt.JwtPayload;
            const { username } = payload as jwt.JwtPayload;
                
            // check if token is invalidated
            const invalidToken = await authModel.tokenInvalid(token, username);
            if(invalidToken) {
                res.status(401).send({success: false, msg: 'Invalid Token'});
                return;
            }
    
            res.status(200).send({ success: true, username });
        }
        catch (error) {
            res.status(401).send({success: false, msg: 'Invalid Token'});
        }
    }
}