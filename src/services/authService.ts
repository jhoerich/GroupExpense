import {AuthRegisterWebApiRequest} from "../controllers/auth/authRegisterWebApiRequest";
import {ifEmpty, isValidEmail} from "../utils/validator";
import {pushRange} from "../utils/list";
import {IAuthService} from "../interfaces/iAuthService";
import { injectable, inject } from 'tsyringe';
import {BenutzerRepository} from "../repositories/benutzerRepository";
import {Tokens} from "../config/tokens";
import {registerAs} from "../utils/decorator";
import {Error} from "../error/error";
import {
    EmailIsAlreadyInUse,
    EmailNotFoundError,
    EmailTooLongError,
    EmailWrongFormatError, PasswordIsNotIdenticError, UsernameIsAlreadyInUse, TextNotFoundError, UsernameTooLongError
} from "../error/validationError";

@registerAs(Tokens.authService)
@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Tokens.benutzerRepository) private readonly repository : BenutzerRepository)
    {
    }

    async validateForRegistration(request: AuthRegisterWebApiRequest) : Promise<Error[]> {
        const validationErrors : Error[] = [];
        pushRange(await this.validateEmail(request.email), validationErrors)
        pushRange(await this.validateBenutzername(request.benutzername), validationErrors)
        pushRange(this.validierePasswort(request.password1, request.password2), validationErrors)
        return validationErrors
    }

    private async validateEmail(email: string) : Promise<Error[]> {
        const validationErrors : Error[] = [];
        if(ifEmpty(email)) {
            validationErrors.push(new EmailNotFoundError());
        }
        if(email.length > 200) {
            validationErrors.push(new EmailTooLongError())
        }
        if(!isValidEmail(email)) {
            validationErrors.push(new EmailWrongFormatError())
        }
        if((await this.repository.ermittleBenutzerZurMail(email)) != null) {
            validationErrors.push(new EmailIsAlreadyInUse())
        }
        return validationErrors
    }

    private async validateBenutzername(benutzername: string) : Promise<Error[]> {
        const validationErrors: Error[] = [];
        if(ifEmpty(benutzername)) {
            validationErrors.push(new TextNotFoundError());
        }
        if(benutzername.length > 100) {
            validationErrors.push(new UsernameTooLongError())
        }
        if((await this.repository.ermittleBenutzerZumBenutzernamen(benutzername)) != null) {
            validationErrors.push(new UsernameIsAlreadyInUse())
        }
        return validationErrors
    }

    private validierePasswort(passwort1 : string, passwort2 : string) : Error[] {
        const validationErrors: Error[] = [];
        if(passwort1 != passwort2) {
            validationErrors.push(new PasswordIsNotIdenticError())
        }
        return validationErrors
    }
}