import { RedisBase } from "./base";
import { ResponseMessage, Message } from "../../interfaces/message";

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

    public async getLastMessageId() {
        this.verifyConnection();

        const lastMessageId: string = await this.client.GET('messages_counter') || '-1';
        return lastMessageId;
    }

    public async isValidMessageId(messageId: number) {
        this.verifyConnection();

        if(messageId < 0)
            return false;

        const lastMessageId = await this.client.GET('messages_counter');
        const isValidMessageId = Number(lastMessageId) >= messageId;
        return isValidMessageId;
    }

    public async getMessages(rangesStart: number, rangeEnd: number): Promise<ResponseMessage[]> {
        this.verifyConnection();

        const messages: ResponseMessage[] = [];
        for(let i = rangesStart; i <= rangeEnd; ++i) {
            const senderId: string = await this.client.HGET(`message:${i}`, 'senderId') || '';
            const username: string = await this.client.HGET(`user:${senderId}`, 'username') || '';
            const content: string = await this.client.HGET(`message:${i}`, 'content') || '';
            const createdAt: string = await this.client.HGET(`message:${i}`, 'createdAt') || '';
            if(username == '' || content == '' || createdAt == '')
            {
                console.log(senderId, content, createdAt);
                console.log('bad message id:', i);
                continue;
            }

            messages.push({
                username,
                content,
                createdAt: new Date(createdAt)
            } as ResponseMessage)
        }

        return messages;
    }
}

export const chatModel = new ChatModel();