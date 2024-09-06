import {NextFunction, Request, Response} from "express";

export interface IAuthController {
    register(req: Request, res: Response) :  Promise<Response | undefined>;
    login(req: Request, res: Response) :  Promise<Response | undefined>;
    midlewareToken(req: Request, res: Response, next: NextFunction) : void;
    refresh(req : Request, res: Response) : void;
}
