import {Request, Response} from "express";

export interface IGroupController {
    create(request: Request, response: Response): Promise<Response | undefined>;
    einladen(req : Request, res : Response) : Promise<Response | undefined>;
    beitreten(req : Request, res : Response) : Promise<Response | undefined>;
}