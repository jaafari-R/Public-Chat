import axios, { Axios } from 'axios';
import { PublicChatApiUtils } from '../PublicChatApiUtils';
import { RegisterResponse } from './interfaces/registerResponse';
import { LoginResponse } from './interfaces/loginResponse';
import { NewMsgResponse } from './interfaces/sendMessage';
import { MessagesResponse } from './interfaces/getMessages';

const BASE_URL = 'http://127.0.0.1:5000/api/v1';

/* TODO add error handling */
class PublicChatApi {
    api: Axios;

    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            withCredentials: true
        });
    }

    /**
     * 
     */
    public async registerUser(username: string, password: string): Promise<RegisterResponse> {
        const hashedPassword: string = await PublicChatApiUtils.prototype.hashPassword(password);
        const response = await this.api.post('/signup', { username, password: hashedPassword });
        return response.data as RegisterResponse;
    }

    /**
     * 
     */
    public async login(username: string, password: string): Promise<LoginResponse> {
        const hashedPassword: string = await PublicChatApiUtils.prototype.hashPassword(password);
        const response = await this.api.post('/signin', { username, password: hashedPassword });
        return response.data as LoginResponse;
    }

    /**
     * 
     */
    public async verifyJWT(): Promise<LoginResponse> {
        const response = await this.api.post('/verifyjwt');
        return response.data as LoginResponse;
    }

    /**
     * 
     */
    public async sendMessage(message: string): Promise<NewMsgResponse> {
        const response = await this.api.post('/chat/send', { message });
        return response.data as NewMsgResponse;
    }

    /**
     * 
     */
    public async getMessages(lastMessageId: string | undefined) {
        let response;
        if(!lastMessageId) {
            response = await this.api.get('/chat/get');
        }
        else {
            response = await this.api.get(`/chat/get/${lastMessageId}`);
        }
        return response as unknown as MessagesResponse;
    }
}

export const publicChatApi = new PublicChatApi();