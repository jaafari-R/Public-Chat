import { RedisBase } from "./base";

class RedisConnect extends RedisBase {
    constructor() {
        super();
    }
    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            const ping_res = await this.client.ping();
            console.log(`Redis Ping Result: ${ping_res}`);
        }
        catch (error) {
            console.log(`Redis Connection Error\n`, error);
        }
    }
}

export const redisConnect: RedisConnect = new RedisConnect();