import axios, { Axios } from 'axios';
import { PublicChatApiUtils } from '../PublicChatApiUtils';
import { RegisterResponse } from './interfaces/registerResponse';
import { LoginResponse } from './interfaces/loginResponse';

const BASE_URL = 'http://127.0.0.1:5000/api/v1';

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
}

export const publicChatApi = new PublicChatApi();