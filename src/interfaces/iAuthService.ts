import {AuthRegisterWebApiRequest} from "../controllers/auth/authRegisterWebApiRequest";

export interface IAuthService {
    validateForRegistration(request: AuthRegisterWebApiRequest) : Promise<string[]>
}