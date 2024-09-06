import {Request, Response} from "express";

export interface IEventManager {
    onConnect(req : Request, res : Response) : void;
    sendEventToAllClients(event : Event) : void;
}