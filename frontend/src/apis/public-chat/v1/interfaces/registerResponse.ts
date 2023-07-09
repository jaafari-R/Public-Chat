import { Response } from "./response";

/**
 * username exists only if success is true
 * msg exists only if success is false
 */
export interface RegisterResponse extends Response {
    msg?: string;
    username?: string;
}