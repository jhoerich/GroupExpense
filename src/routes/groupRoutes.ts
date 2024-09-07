import {Router} from "express";
import {container} from "../config/inversify.config";
import {TYPES} from "../config/types.config";
import {IGroupController} from "../interfaces/iGroupController";
import {IAuthController} from "../interfaces/iAuthController";

export class GroupRoutes {
    registerGroupRoutes(router: Router) {
        const controller = container.get<IGroupController>(TYPES.IGroupController);
        const authController = container.get<IAuthController>(TYPES.IAuthController);
        router.post("/group", authController.midlewareToken, controller.create.bind(controller));
        router.put("/invite", authController.midlewareToken, controller.einladen.bind(controller));
        //router.get("/join/:inviteId", authController.midlewareToken, )
    }
}