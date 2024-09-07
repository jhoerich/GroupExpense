import {EventClient} from "./eventClient";
import {Request, Response} from "express";
import {IEventRequet} from "./eventRequet";
import {IEventManager} from "../interfaces/iEventManager";
import {injectable} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";
import {ServerEvent} from "./serverEvent";

@registerAs(Tokens.eventManager)
@injectable()
export class EventManager implements IEventManager {
    private clients : EventClient[] = [];

    onConnect(req : Request, res : Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const eventRequest = req.body as IEventRequet;
        const client = new EventClient(eventRequest.id, res)
        this.clients.push(client);
        res.write(`data: connected\n\n`);
        req.on('close', () => this.onDisconnect(client))
    }

    onDisconnect(client : EventClient) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    sendEventToAllClients(event : ServerEvent) {
        this.clients.forEach(client => {
            client.response.write({event: event});
        })
    }
}