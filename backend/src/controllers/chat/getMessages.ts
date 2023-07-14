import { Request, Response } from "express";
import { chatModel } from "../../services/redis/chat";
import { Message } from "../../interfaces/message";


export class GetMessages {
    public async get30Messages(req: Request, res: Response) {
        const { lastMessageId } = req.body;

        /* Check if last message ID is valid*/
        const validMessageId = chatModel.isValidMessageId(lastMessageId);
        if(!validMessageId)
            return res.status(400).json({success: false, msg: "Invalid last message Id received"});

        /* get last 30 messages before the message with id lastMessageId */
        const firstMessageId = Math.max(lastMessageId - 29, 0); 
        const messages: Message[] = await chatModel.getMessages(firstMessageId, lastMessageId);

        res.status(200).json({
            success: true,
            messages
        })
    }
}