import { Response } from "./response";

/**
 * msg exists only if success is false
 * username exists only if success is true
 */
export interface LoginResponse extends Response {
    msg?: string;
    username?: string;
}