import {Request, Response} from "express";
import {ServerEvent} from "../event/serverEvent";

export interface IEventManager {
    onConnect(req : Request, res : Response) : void;
    sendEventToAllClients(event : ServerEvent) : void;
}