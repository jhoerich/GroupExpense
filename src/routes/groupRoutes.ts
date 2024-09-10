import {Router} from "express";
import {IGroupController} from "../interfaces/iGroupController";
import {IAuthController} from "../interfaces/iAuthController";
import {container} from "tsyringe";
import {Tokens} from "../config/tokens";

export class GroupRoutes {
    registerGroupRoutes(router: Router) {
        const controller = container.resolve<IGroupController>(Tokens.groupController);
        const authController = container.resolve<IAuthController>(Tokens.authController);
        router.post("/group", controller.create.bind(controller));
    }
}