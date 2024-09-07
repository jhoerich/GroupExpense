import {AuthRegisterWebApiRequest} from "../controllers/auth/authRegisterWebApiRequest";
import {Error} from "../error/error";

export interface IAuthService {
    validateForRegistration(request: AuthRegisterWebApiRequest) : Promise<Error[]>
}