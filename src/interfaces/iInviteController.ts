import {Request, Response} from "express";

export interface IInviteController {
    einladen(req : Request, res : Response) : Promise<Response | undefined>;
    beitreten(req : Request, res : Response) : Promise<Response | undefined>;
}