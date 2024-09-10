import {NextFunction, Response} from "express";
import {ApiRequest} from "../framework/apiRequest";
import {AuthRequest} from "../framework/requestTypes/authRequest";

export interface IAuthController {
    register(req: AuthRequest, res: Response) :  Promise<Response | undefined>;
    login(req: AuthRequest, res: Response) :  Promise<Response | undefined>;
    midlewareToken(req: ApiRequest, res: Response, next: NextFunction) : void;
    refresh(req : AuthRequest, res: Response) : void;
}
