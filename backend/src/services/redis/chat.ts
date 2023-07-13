import { RedisBase } from "./base";
import { Message } from "../../interfaces/message";

class ChatModel extends RedisBase {
    constructor() {
        super();
    }

    public async createMessage(messageData: Message) {
        this.verifyConnection();

        const { senderId, content, createdAt } = messageData;
        const message_id = await this.client.INCR('messages_counter');
        this.client.HSET(`message:${message_id}`, 'senderId', senderId);
        this.client.HSET(`message:${message_id}`, 'content', content);
        this.client.HSET(`message:${message_id}`, 'createdAt', createdAt.toString());
    }
}

export const chatModel = new ChatModel();