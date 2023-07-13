import { Request, Response } from "express";


export class NewMessage {
    /* TODO Functionality */
    /* TODO Populate message using Socket.IO with Redis */
    /* TODO Add Authentication middleware */
    public create(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            message: "HI"
        });
    }
}