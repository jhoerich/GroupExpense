import {Error} from "./error";

export class LoginNotPossibleError implements Error {
    key : string = "ERROR_LOGIN_NOT_POSSIBLE";
    message: string = "Login is not possible";
}

export class InvalidOrExpiredTokenError implements Error {
    key : string = "ERROR_INVALID_OR_EXPIRED_TOKEN";
    message : string = "Invalid or expired token!";
}

export class InvalidInviteError implements Error {
    key : string = "ERROR_INVALID_INVITE_TOKEN";
    message : string = "Invalid invite token!";
}