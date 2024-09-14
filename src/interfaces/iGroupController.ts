import {Request, Response} from "express";

export interface IGroupController {
    create(request: Request, response: Response): Promise<Response | undefined>;
    getGroups(request: Request, response: Response): Promise<Response | undefined>;
}