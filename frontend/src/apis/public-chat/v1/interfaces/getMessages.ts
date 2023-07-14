import { Response } from "./response";

export interface Message {
    username: string;
    content: string;
    createdAt: Date;
} 

export interface MessagesResponse extends Response {
    messages: Message[];
}