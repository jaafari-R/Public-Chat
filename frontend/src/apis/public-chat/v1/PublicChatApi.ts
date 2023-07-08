import axios, { Axios } from 'axios';

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
    public async registerUser(username: string, password: string): Promise<void> {
        const response = await this.api.post('/signup', { username, password });
    }
}

export const publicChatApi = new PublicChatApi();