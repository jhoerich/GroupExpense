
import "reflect-metadata";
import {IAuthController} from "../interfaces/iAuthController";
import {container} from "tsyringe";
import {Tokens} from "../config/tokens";

import { Request, Response, Router } from 'express';
import {AuthRequest} from "../framework/requestTypes/authRequest";

export class AuthRoutes {
    registerAuthRoutes(router: Router) {
        const controller = container.resolve<IAuthController>(Tokens.authController);
        const authRoutes = Router()

        const prefix = '/auth'
        router.use(prefix, authRoutes)
        authRoutes.post(`*`, (req : Request, res : Response) => {
            const request = req as AuthRequest;
            switch (request.apiKey.replace(prefix, '')) {
                case "/login":
                    return controller.login(request, res);
                case "/register":
                    return controller.register(request, res);
                case "/refresh":
                    return controller.refresh(request, res);
            }
        })
    }
}