import { hash } from 'bcryptjs';

const SALT: string = '$2a$10$SE6kweVuJklbToIG.0hCqe';

export class PublicChatApiUtils {

    public async hashPassword(password: string): Promise<string>{
        const hashedPassword: string = await hash(password, SALT);
        return hashedPassword;
    }
}