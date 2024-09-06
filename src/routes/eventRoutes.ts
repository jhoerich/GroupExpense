import {Router} from "express";
import {container} from "../config/inversify.config";
import {IEventManager} from "../interfaces/iEventManager";
import {TYPES} from "../config/types.config";

export class EventRoutes {
    registerEventRoutes(router : Router) {
        const eventManager = container.get<IEventManager>(TYPES.IEventManager);
        router.get('/events', eventManager.onConnect.bind(eventManager));
    }
}