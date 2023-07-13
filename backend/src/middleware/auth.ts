import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '../config';

const AUTH_ROUTES = [
    '/api/v1/signup',
    '/api/v1/signin',
    '/api/v1/verifyjwt'
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(AUTH_ROUTES.includes(req.path)) {
        return next();
    }

    const token = req.cookies.token;
    if(!token)
    return res.status(401).json({ success: false, msg: 'Token missing'});

    try {
        const { username } = jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS512']}) as JwtPayload;
        req.body.username = username;
    }
    catch (error) {
        console.log("JWT Middleware Error\n", error)
        return res.status(401).json({ success: false, msg: 'Invalid Token'});
    }
    next();
}