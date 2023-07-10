import { compare, hash } from "bcrypt";
import { Auth } from "../../interfaces/auth";
import { RedisBase } from "./base";

const SALT_ROUNDS = 12;

class AuthModel extends RedisBase {
    constructor() {
        super();
        this.client.connect();
    }

    /**
     * Create new user auth to Redis
     */
    public async createUserAuth(authData: Auth, username: string): Promise<void> {
        this.verifyConnection();

        const { userId, password } = authData;
        const hashedPassword = await this.hashPassword(password);

        await this.client.HSET(`usernameToID:${username}`, 'userId', userId);
        await this.client.HSET(`auth:${userId}`, 'password', hashedPassword);
    }

    /**
     * Return true if user already exists, false if user does not exist
     */
    public async authExists(username: string): Promise<boolean> {
        this.verifyConnection();
        const usernameExists = await this.client.HEXISTS(`usernameToID:${username}`, 'userId');
        return usernameExists;
    }

    /**
     * return true if the password matches the username, false otherwise
     */
    public async comparePassword(authData: Auth): Promise<boolean>{
        this.verifyConnection();
        const { userId, password } = authData;
        const hashedPassword: string = await this.client.HGET(`auth:${userId}`, 'password') || '';
        const passwordMatch: boolean = await compare(password, hashedPassword);
        return passwordMatch;
    }

    public async getUserIdByUsername(username: string): Promise<string> {
        this.verifyConnection();
        const userId: string = await this.client.HGET(`usernameToID:${username}`, 'userId') || '';
        return userId;
    }

    public async storeInvalidToken(): Promise<void> {

    }

    public async tokenInvalid(token: string, username: string): Promise<boolean> {
        this.verifyConnection()
        const invalidToken = await this.client.SISMEMBER(`invalidJWT:${username}`, token);
        return invalidToken;
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await hash(password, SALT_ROUNDS)
        return hashedPassword;
    }
}

export const authModel = new AuthModel();