import { Router} from "express";
import { AuthRoutes } from "./authRoutes";
import {GroupRoutes} from "./groupRoutes";

export function registerRoutes(router: Router) {
    new AuthRoutes().registerAuthRoutes(router);
    new GroupRoutes().registerGroupRoutes(router);
}