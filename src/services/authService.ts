import {AuthRegisterWebApiRequest} from "../controllers/auth/authRegisterWebApiRequest";
import {ifEmpty, isValidEmail} from "../utils/validator";
import {pushRange} from "../utils/list";
import {IAuthService} from "../interfaces/iAuthService";
import { injectable, inject } from 'tsyringe';
import {BenutzerRepository} from "../repositories/benutzerRepository";
import {Tokens} from "../config/tokens";
import {registerAs} from "../utils/decorator";

@registerAs(Tokens.authService)
@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Tokens.benutzerRepository) private readonly repository : BenutzerRepository)
    {
    }

    async validateForRegistration(request: AuthRegisterWebApiRequest) : Promise<string[]> {
        const validationErrors : string[] = [];
        pushRange(await this.validateEmail(request.email), validationErrors)
        pushRange(await this.validateBenutzername(request.benutzername), validationErrors)
        pushRange(this.validierePasswort(request.password1, request.password2), validationErrors)
        return validationErrors
    }

    private async validateEmail(email: string) : Promise<string[]> {
        const validationErrors : string[] = [];
        if(ifEmpty(email)) {
            validationErrors.push("E-Mail ist nicht angegeben!");
        }
        if(email.length > 200) {
            validationErrors.push("E-Mail ist zu lang!")
        }
        if(!isValidEmail(email)) {
            validationErrors.push("Die E-Mail besitzt nicht das richtige Format!")
        }
        if((await this.repository.ermittleBenutzerZurMail(email)) != null) {
            validationErrors.push("E-Mail Adresse ist bereits vergeben!")
        }
        return validationErrors
    }

    private async validateBenutzername(benutzername: string) : Promise<string[]> {
        const validationErrors: string[] = [];
        if(ifEmpty(benutzername)) {
            validationErrors.push("Benutzername ist nicht angegeben!");
        }
        if(benutzername.length > 100) {
            validationErrors.push("Benutzername ist zu lang!")
        }
        if((await this.repository.ermittleBenutzerZumBenutzernamen(benutzername)) != null) {
            validationErrors.push("Benutzername existiert bereits!")
        }
        return validationErrors
    }

    private validierePasswort(passwort1 : string, passwort2 : string) : string[] {
        const validationErrors: string[] = [];
        if(passwort1 != passwort2) {
            validationErrors.push("Die beiden Passwörter stimmen nicht übereinander!")
        }
        return validationErrors
    }
}