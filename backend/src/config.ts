import dotenv from 'dotenv';

dotenv.config({});

class Config {
    PORT: number;

    readonly DEFAULT_PORT = 5000;

    constructor() {
        this.PORT = Number(process.env.PORT) | this.DEFAULT_PORT;
    }
}

export const config = new Config();