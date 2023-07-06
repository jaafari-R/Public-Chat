import { redisConnect } from './services/redis/redis.connect';

export const connectToRedis = async () => {
    await redisConnect.connect();
}