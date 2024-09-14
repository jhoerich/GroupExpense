import {Router} from "express";
import {IEventManager} from "../../interfaces/iEventManager";
import {container} from "tsyringe";
import {Tokens} from "../../config/tokens";

export class EventRoutes {
    registerEventRoutes(router : Router) {
        const eventManager = container.resolve<IEventManager>(Tokens.eventManager);
        router.get('/events', eventManager.onConnect.bind(eventManager));
    }
}