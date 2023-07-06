import { createClient } from "redis";
import { config } from "../../config";

type RedisClient = ReturnType<typeof createClient>;

export abstract class RedisBase {
    client: RedisClient;
    
    constructor() {
        this.client = createClient({ url: config.REDIS_URL });
    }
}