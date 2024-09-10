import {Error} from "../error/error";
import {AuthRegisterBody} from "../controllers/auth/bodies/authRegisterBody";

export interface IAuthService {
    validateForRegistration(body: AuthRegisterBody) : Promise<Error[]>
}