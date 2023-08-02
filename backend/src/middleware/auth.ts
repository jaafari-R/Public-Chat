import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ExtendedError } from 'socket.io/dist/namespace';

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

export const socketIOAuthMiddleware = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        next: (err?: ExtendedError | undefined) => void) => {
    const cookies = socket.handshake.headers.cookie?.split(' ');

    if(!cookies) {
        socket.send("Token is missing, disconnecting...")
        socket.disconnect();
        return;
    }

    const token = extractToken(cookies);

    try {
        const { username } = jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS512']}) as JwtPayload;
        socket.data.username = username;
        next();
    }
    catch (error) {
        console.log("JWT Middleware Error\n", error)
        socket.send("Invalid token, disconnecting...")
        socket.disconnect();
        
    }
}

const extractToken = (cookies: string[]): string => {
    for(const cookie of cookies) {
        if(cookie.slice(0,6) == 'token=') {
            const token = cookie.slice(6);
            if(token.slice(-1) == ';') {
                return token.slice(0, -1);
            }
            return token;
        }
    }
    return ''
}