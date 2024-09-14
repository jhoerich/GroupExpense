import {NextFunction, Response} from "express";
import {AuthRequest} from "../framework/requestTypes/authRequest";
import {TokenRequest} from "../framework/requestTypes/tokenRequest";

export interface IAuthController {
    register(req: AuthRequest, res: Response) :  Promise<Response | undefined>;
    login(req: AuthRequest, res: Response) :  Promise<Response | undefined>;
    midlewareToken(req: TokenRequest, res: Response, next: NextFunction) : void;
    refresh(req : AuthRequest, res: Response) : void;
}
