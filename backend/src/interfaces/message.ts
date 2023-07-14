export interface Message {
    senderId: string;
    content: string;
    createdAt: Date;
}

export interface ResponseMessage {
    username: string;
    content: string;
    createdAt: Date;
}