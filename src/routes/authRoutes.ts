import {Router} from "express";
import "reflect-metadata";
import {IAuthController} from "../interfaces/iAuthController";
import {container} from "tsyringe";
import {Tokens} from "../config/tokens";

export class AuthRoutes {
    registerAuthRoutes(router: Router) {
        const controller = container.resolve<IAuthController>(Tokens.authController)
        router.post("/register", controller.register.bind(controller));
        router.get("/login", controller.login.bind(controller));
        router.put("/refresh", controller.refresh.bind(controller));
    }
}