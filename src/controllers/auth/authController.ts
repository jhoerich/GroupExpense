import {NextFunction, Request, Response} from "express";
import {AuthRegisterWebApiRequest} from "./authRegisterWebApiRequest";
import bcrypt from 'bcrypt';
import {generateLongTermToken, generateToken, verifyToken} from "../../utils/token";
import {AuthLoginWebApiRequest} from "./authLoginWebApiRequest";
import {IAuthController} from "../../interfaces/iAuthController";
import {IAuthService} from "../../interfaces/iAuthService";
import {IBenutzerFactory} from "../../interfaces/iBenutzerFactory";
import {IBenutzerRepository} from "../../interfaces/iBenutzerRepository";
import {IWebApiRequest} from "../../framework/webApiRequest";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {registerAs} from "../../utils/decorator";

@registerAs(Tokens.authController)
@injectable()
export class AuthController implements IAuthController {
    constructor(
        @inject(Tokens.benutzerRepository) private readonly repository: IBenutzerRepository,
        @inject(Tokens.authService) private readonly service: IAuthService,
        @inject(Tokens.benutzerFactory) private readonly factoy: IBenutzerFactory) {
    }

    async register(req: Request, res: Response) {
        const request = req.body as AuthRegisterWebApiRequest;
        const validationErrors = await this.service.validateForRegistration(request);
        if (validationErrors.length > 0) {
            return res.status(409).json({errors: validationErrors});
        }
        const hashedPassword = await this.getHashedPasswort(request.password1);
        const benutzer = await this.factoy.erzeugeBenutzer(request.benutzername,
            request.email, hashedPassword);
        const token = generateToken(benutzer.id)
        const longtermToken = generateLongTermToken(benutzer.id);
        return res.status(200).json({benutzerId: benutzer.id, token: token, longtermToken: longtermToken});
    }

    async login(req: Request, res: Response) {
        const request = req.body as AuthLoginWebApiRequest;
        const benutzer = await this.repository.ermittleBenutzerZumBenutzernamen(request.benutzername);
        if (benutzer == null) {
            return res.status(404).json({errors: "Es konnte sich nicht angemeldet werden!"})
        }
        if (!(await bcrypt.compare(request.password, benutzer.passwortHash))) {
            return res.status(404).json({errors: "Es konnte sich nicht angemeldet werden!"})
        }
        const token = generateToken(benutzer.id)
        const longTermToken = generateLongTermToken(benutzer.id);
        return res.status(200).json({benutzerId: benutzer.id, token: token, longTermToken:longTermToken});
    }

    refresh(req : Request, res: Response) {
        const request = req.body as IWebApiRequest;
        let token = request.token;
        verifyToken(token, (err) => {
            if(err) {
                verifyToken(request.longTermToken, (err, decoded) => {
                    if(err) {
                        return res.status(401).json({errors: "invalid token!"})
                    }
                    token = generateToken(decoded.userId);
                })
            }
        })
        return res.status(200).json({token:token, longTermToken:request.longTermToken});
    }

    midlewareToken(req: Request, res: Response, next: NextFunction) {
        const request = req.body as IWebApiRequest;
        const token = request.token;
        if(token == undefined) {
            return res.status(401).json({errors: "invalid token!"})
        }
        verifyToken(token, (err) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token!'});
            }
            next();
        })
    }

    private async getHashedPasswort(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}