import { Auth } from "../../interfaces/auth";
import { RedisBase } from "./base";

class AuthModel extends RedisBase {
    constructor() {
        super();
        this.client.connect();
    }

    /**
     * Create new user auth to Redis
     */
    public async createUserAuth(authData: Auth, username: string) {
        this.verifyConnection();

        const { userId, password } = authData;
        await this.client.HSET(`usernameToID:${username}`, 'userId', userId);
        await this.client.HSET(`auth:${userId}`, 'password', password);
    }

    /**
     * Return true if user already exists, false if user does not exist
     */
    public async authExists(username: string): Promise<boolean> {
        this.verifyConnection();
        const usernameExists = await this.client.HEXISTS(`usernameToID:${username}`, 'userId');
        return usernameExists;
    }
}

export const authModel = new AuthModel();