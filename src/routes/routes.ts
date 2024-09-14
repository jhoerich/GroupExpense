import { Router} from "express";
import { AuthRoutes } from "./authRoutes";
import {apiKeyMiddleware} from "../framework/baseController";
import {registerTokenRoutes} from "./baseTokenRoute";

export function registerRoutes(router: Router) {
    router.use(apiKeyMiddleware);

    new AuthRoutes().registerAuthRoutes(router);
    registerTokenRoutes(router);
}