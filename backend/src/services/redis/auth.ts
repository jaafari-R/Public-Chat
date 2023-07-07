import { Auth } from "../../interfaces/auth";
import { RedisBase } from "./base";

class AuthModel extends RedisBase {
    constructor() {
        super();
        this.client.connect();
    }

    /**
     * Save new user password to Redis
     */
    public async saveUserAuth(authData: Auth, username: string) {
        this.verifyConnection();

        const { userId, password } = authData;
        await this.client.HSET(`usernameToID`, username, userId);
        await this.client.HSET('auth', 'userId', userId);
        await this.client.HSET('auth', 'password', password);
    }

    /**
     * Return true if user already exists, false if user does not exist
     */
    public async authExists(username: string): Promise<boolean> {
        this.verifyConnection();
        
        return await this.client.HEXISTS(`usernameToId`, username);
    }
}

export const authModel = new AuthModel();