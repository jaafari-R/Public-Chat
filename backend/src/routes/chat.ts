import express, { Router } from "express";
import { NewMessage } from "../controllers/chat/newMessage";
import { GetMessages } from "../controllers/chat/getMessages";

class ChatRoutes {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes() {
        this.router.post('/chat/send', NewMessage.prototype.create);
        this.router.get('/chat/get/:lastMessageId', GetMessages.prototype.get30Messages);

        return this.router;
    }
}

export const chatRoutes = new ChatRoutes();