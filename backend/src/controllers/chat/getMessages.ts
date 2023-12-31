import { Request, Response } from "express";
import { chatModel } from "../../services/redis/chat";
import { ResponseMessage } from "../../interfaces/message";


export class GetMessages {
    public async get30Messages(req: Request, res: Response) {
        let lastMessageId: string = req.params.lastMessageId || '-1';
        if(lastMessageId === '-1') {
            lastMessageId = await chatModel.getLastMessageId();
        }

        /* Check if last message ID is valid*/
        const validMessageId: boolean = await chatModel.isValidMessageId(Number(lastMessageId));
        if(!validMessageId)
            return res.status(400).json({success: false, msg: "Invalid last message Id received"});

        /* get last 30 messages before the message with id lastMessageId */
        const firstMessageId = Math.max(Number(lastMessageId) - 29, 0); 
        const messages: ResponseMessage[] = await chatModel.getMessages(firstMessageId, Number(lastMessageId));

        res.status(200).json({
            success: true,
            messages
        })
    }
}