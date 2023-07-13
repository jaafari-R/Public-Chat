import { Request, Response } from "express";
import { chatModel } from "../../services/redis/chat";


export class NewMessage {
    /* TODO Functionality */
    /* TODO Populate message using Socket.IO with Redis */
    /* TODO Add Authentication middleware */
    public create(req: Request, res: Response) {


        // chatModel.createMessage()
        res.status(200).json({
            success: true,
            message: "HI"
        });
    }
}