import { Request, Response } from "express";
import { chatModel } from "../../services/redis/chat";
import { Message } from "../../interfaces/message";
import { authModel } from "../../services/redis/auth";


export class NewMessage {
    /* TODO Populate message using Socket.IO with Redis */
    public async create(req: Request, res: Response) {
        const { username, message } = req.body;
        const senderId = await authModel.getUserIdByUsername(username);
        const createdAt = new Date();

        const messageData = {senderId, content: message, createdAt} as Message;
        chatModel.createMessage(messageData);
        
        res.status(200).json({
            success: true,
            message: "HI"
        });
    }
}