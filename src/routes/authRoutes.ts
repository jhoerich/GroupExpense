import {Router} from "express";
import "reflect-metadata";
import {container} from "../config/inversify.config";
import {TYPES} from "../config/types.config";
import {IAuthController} from "../interfaces/iAuthController";

export class AuthRoutes {
    registerAuthRoutes(router: Router) {
        const controller = container.get<IAuthController>(TYPES.IAuthController);
        router.post("/register", controller.register.bind(controller));
        router.get("/login", controller.login.bind(controller));
        router.put("/refresh", controller.refresh.bind(controller));
    }
}

