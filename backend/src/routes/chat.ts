import express, { Router } from "express";
import { NewMessage } from "../controllers/chat/newMessage";

class ChatRoutes {
    router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes() {
        this.router.post('/chat/send', NewMessage.prototype.create);

        return this.router;
    }
}

export const chatRoutes = new ChatRoutes();