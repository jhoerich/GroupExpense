import {NextFunction, Request, Response} from "express";
import {IWebApiRequest} from "./webApiRequest";
import {ApiRequest} from "./apiRequest";
import {IApiRequestBody} from "./apiRequestBody";
import {TokenRequest} from "./requestTypes/tokenRequest";

export abstract class BaseController {
    getRequest<T extends IWebApiRequest>(req: Request): T {
        return req.body as T;
    }
}

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.get('api-key') || req.query.apiKey || req.body.apiKey;
    if (!apiKey) {
        return res.status(400).json({ error: 'API key missing' });
    }

    (req as ApiRequest).getBody = function (): IApiRequestBody {
        return req.body as IApiRequestBody;
    };

    (req as ApiRequest).getCastedBody = function<T extends IApiRequestBody>(): T {
        return (req as ApiRequest).getBody() as T;
    };

    (req as ApiRequest).apiKey = apiKey as string;
    next();
}


export function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.get('token') || req.query.token || req.body.token;

    if (!token) {
        return res.status(400).json({ errors: [{'key':'token is missing', 'message':'Token is missing'}] });
    }

    (req as TokenRequest).token = token;
    next();
}