import {Router} from "express";
import {container} from "tsyringe";
import {Tokens} from "../config/tokens";
import {IAuthController} from "../interfaces/iAuthController";
import {IInviteController} from "../interfaces/iInviteController";

export class InviteRoutes {
    registerInviteRoutes(router: Router) {
        const controller = container.resolve<IInviteController>(Tokens.inviteController);
        const authController = container.resolve<IAuthController>(Tokens.authController);
        router.post("/invite",  controller.einladen.bind(controller));
        router.put("/join/:token", controller.beitreten.bind(controller));
    }
}