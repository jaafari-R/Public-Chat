import { PublicChatServer } from "./setupServer";


class Application {
    
    constructor() {
        const server: PublicChatServer = new PublicChatServer();

        server.start();
    }
}

const application = new Application();