import dotenv from 'dotenv';

dotenv.config({});

class Config {
    PORT: number;
    REDIS_URL: string;
    JWT_SECRET: string;

    private readonly DEFAULT_PORT = 5000;
    private readonly DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379';
    private readonly DEFAULT_JWT_SECRET = '';

    constructor() {
        this.PORT = Number(process.env.PORT) || this.DEFAULT_PORT;
        this.REDIS_URL = process.env.REDIS_URL || this.DEFAULT_REDIS_URL;
        this.JWT_SECRET = process.env.JWT_SECRET || this.DEFAULT_JWT_SECRET;
    }
}

export const config = new Config();