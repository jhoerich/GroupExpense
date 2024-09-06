import { Router} from "express";
import { AuthRoutes } from "./authRoutes";
import {GroupRoutes} from "./groupRoutes";
import {EventRoutes} from "./eventRoutes";

export function registerRoutes(router: Router) {
    new AuthRoutes().registerAuthRoutes(router);
    new GroupRoutes().registerGroupRoutes(router);
    new EventRoutes().registerEventRoutes(router);
}