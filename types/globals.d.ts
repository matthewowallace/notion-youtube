import {User} from "./types";

declare global {
    interface CustomJwtSessionsClaims extends User {}
}