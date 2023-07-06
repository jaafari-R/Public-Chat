import dotenv from 'dotenv';

dotenv.config({});

class Config {
    PORT: number;
    REDIS_URL: string | undefined;

    readonly DEFAULT_PORT = 5000;
    readonly DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379';

    constructor() {
        this.PORT = Number(process.env.PORT) || this.DEFAULT_PORT;
        this.REDIS_URL = process.env.REDIS_URL || this.DEFAULT_REDIS_URL;
    }
}

export const config = new Config();