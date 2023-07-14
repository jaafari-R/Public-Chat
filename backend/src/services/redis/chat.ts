import { RedisBase } from "./base";
import { Message } from "../../interfaces/message";

class ChatModel extends RedisBase {
    constructor() {
        super();
    }

    public async createMessage(messageData: Message): Promise<void> {
        this.verifyConnection();

        const { senderId, content, createdAt } = messageData;
        const message_id = await this.client.INCR('messages_counter');
        this.client.HSET(`message:${message_id}`, 'senderId', senderId);
        this.client.HSET(`message:${message_id}`, 'content', content);
        this.client.HSET(`message:${message_id}`, 'createdAt', createdAt.toString());
    }

    public async isValidMessageId(messageId: number) {
        this.verifyConnection();

        const lastMessageId = await this.client.GET('messages_counter');
        const isValidMessageId = Number(lastMessageId) >= messageId;
        console.log(isValidMessageId)
        return isValidMessageId;
    }

    public async getMessages(rangesStart: number, rangeEnd: number): Promise<Message[]> {
        this.verifyConnection();

        const messages: Message[] = [];
        for(let i = rangesStart; i <= rangeEnd; ++i) {
            const senderId: string = await this.client.HGET(`message:${i}`, 'senderId') || '';
            const content: string = await this.client.HGET(`message:${i}`, 'content') || '';
            const createdAt: string = await this.client.HGET(`message:${i}`, 'createdAt') || '';
            if(senderId == '' || content == '' || createdAt == '')
            {
                console.log(senderId, content, createdAt);
                console.log('bad message id:', i);
                continue;
            }

            messages.push({
                senderId,
                content,
                createdAt: new Date(createdAt)
            } as Message)
        }

        return messages;
    }
}

export const chatModel = new ChatModel();