
import "reflect-metadata";
import {IAuthController} from "../interfaces/iAuthController";
import {container} from "tsyringe";
import {Tokens} from "../config/tokens";

import { Request, Response, Router } from 'express';
import {apiKeyMiddleware} from "../framework/baseController";
import {AuthRequest} from "../framework/requestTypes/authRequest";

export class AuthRoutes {
    registerAuthRoutes(router: Router) {
        const controller = container.resolve<IAuthController>(Tokens.authController);

        router.use(apiKeyMiddleware);
        router.post('*', (req : Request, res : Response) => {1
            const request = req as AuthRequest;
            switch (request.apiKey) {
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