import {IApiRequestBody} from "./apiRequestBody";
import {Request} from "express";

export interface ApiRequest extends Request {
    apiKey : string;
    getBody() : IApiRequestBody;
    getCastedBody<T extends IApiRequestBody>() : T;
}