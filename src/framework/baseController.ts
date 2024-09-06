import {Request} from "express";
import {IWebApiRequest} from "./webApiRequest";
import {injectable} from "inversify";

@injectable()
export abstract class BaseController {
    getRequest<T extends IWebApiRequest>(req : Request) : T {
       return req.body as T;
    }
}