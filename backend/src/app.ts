import { connectToRedis } from "./setupDatabase";
import { PublicChatServer } from "./setupServer";


class Application {
    
    constructor() {
        const server: PublicChatServer = new PublicChatServer();

        connectToRedis();
        server.start();
    }
}

const application = new Application();