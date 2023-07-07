import { Request, Response } from "express";
import { authModel } from "../../services/redis/auth";

export class SignUp {
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const userExists: boolean = await authModel.authExists(username);
        if(userExists) {
            console.log(`user ${username} already exists`)
            res.send("FAIL");
        }

        res.send('user created successfully');
    }
}