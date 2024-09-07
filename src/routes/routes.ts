import { Router} from "express";
import { AuthRoutes } from "./authRoutes";
import {GroupRoutes} from "./groupRoutes";
import {EventRoutes} from "./eventRoutes";
import {InviteRoutes} from "./inviteRoutes";
import {ExpenseRoutes} from "./expenseRoutes";

export function registerRoutes(router: Router) {
    new AuthRoutes().registerAuthRoutes(router);
    new GroupRoutes().registerGroupRoutes(router);
    new EventRoutes().registerEventRoutes(router);
    new InviteRoutes().registerInviteRoutes(router);
    new ExpenseRoutes().registerExpenseRoutes(router);
}