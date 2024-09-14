import {NextFunction, Response} from "express";
import bcrypt from 'bcrypt';
import {generateLongTermToken, generateToken, verifyToken} from "../../utils/token";
import {IAuthController} from "../../interfaces/iAuthController";
import {IAuthService} from "../../interfaces/iAuthService";
import {IBenutzerFactory} from "../../interfaces/iBenutzerFactory";
import {IBenutzerRepository} from "../../interfaces/iBenutzerRepository";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {registerAs} from "../../utils/decorator";
import {InvalidOrExpiredTokenError} from "../../error/authError";
import {AuthLoginBody} from "./bodies/authLoginBody";
import {AuthRegisterBody} from "./bodies/authRegisterBody";
import {AuthRefreshBody} from "./bodies/authRefreshBody";
import {AuthRequest} from "../../framework/requestTypes/authRequest";
import {PasswordWrongError, UserNotFoundError} from "../../error/entityError";
import {TokenRequest} from "../../framework/requestTypes/tokenRequest";

@registerAs(Tokens.authController)
@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(Tokens.benutzerRepository) private readonly repository: IBenutzerRepository,
        @inject(Tokens.authService) private readonly service: IAuthService,
        @inject(Tokens.benutzerFactory) private readonly factoy: IBenutzerFactory) {
    }

    async register(req: AuthRequest, res: Response) {
        const body = req.getCastedBody<AuthRegisterBody>();
        const validationErrors = await this.service.validateForRegistration(body);
        if (validationErrors.length > 0) {
            return res.status(409).json({errors: validationErrors});
        }

        const hashedPassword = await this.getHashedPasswort(body.password1);
        const benutzer = await this.factoy.erzeugeBenutzer(body.username,
            body.email, hashedPassword);

        const token = generateToken(benutzer.id)
        const longtermToken = generateLongTermToken(benutzer.id);
        return res.status(200).json({benutzerId: benutzer.id, token: token, longtermToken: longtermToken});
    }

    async login(req: AuthRequest, res: Response) {
        const body = req.getCastedBody<AuthLoginBody>();
        const benutzer = await this.repository.ermittleBenutzerZumBenutzernamen(body.username);

        if (benutzer == null) {
            return res.status(404).json({errors: [new UserNotFoundError()]});
        }

        if (!(await bcrypt.compare(body.password, benutzer.passwortHash))) {
            return res.status(404).json({errors: [new PasswordWrongError()]});
        }

        const token = generateToken(benutzer.id)
        const longTermToken = generateLongTermToken(benutzer.id);
        return res.status(200).json({benutzerId: benutzer.id, token: token, longTermToken:longTermToken});
    }

    refresh(req : AuthRequest, res: Response) {
        const body = req.getCastedBody<AuthRefreshBody>();
        let token = body.token;
        verifyToken(token, (err) => {
            if(err) {
                verifyToken(body.longTermToken, (err, decoded) => {
                    if(err) {
                        return res.status(401).json({errors: [new InvalidOrExpiredTokenError()]})
                    }
                    token = generateToken(decoded.userId);
                })
            }
        })
        return res.status(200).json({token:token, longTermToken:body.longTermToken});
    }

    midlewareToken(req: TokenRequest, res: Response, next: NextFunction) {
        const token = req.token;
        if(token == undefined) {
            return res.status(401).json({errors: [new InvalidOrExpiredTokenError()]})
        }
        verifyToken(token, (err) => {
            if (err) {
                return res.status(403).json({ error: [new InvalidOrExpiredTokenError()]});
            }
            next();
        })
    }

    private async getHashedPasswort(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}