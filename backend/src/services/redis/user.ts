import { User } from "../../interfaces/user";
import { RedisBase } from "./base";


class UserModel extends RedisBase {
    constructor() {
        super();
    }

    /**
     * Create new user to Redis
     */
    public async createUser(userData: User) {
        this.verifyConnection();

        const { userId, username } = userData;
        await this.client.HSET(`user:${userId}`, 'username', username);
    }
}

export const userModel = new UserModel();