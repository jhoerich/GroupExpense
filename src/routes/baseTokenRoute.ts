import {Router} from "express";
import {tokenMiddleware} from "../framework/baseController";
import {GroupRoutes} from "./tokenRoutes/groupRoutes";
import {EventRoutes} from "./tokenRoutes/eventRoutes";
import {InviteRoutes} from "./tokenRoutes/inviteRoutes";
import {ExpenseRoutes} from "./tokenRoutes/expenseRoutes";
import {container} from "tsyringe";
import {IAuthController} from "../interfaces/iAuthController";
import {Tokens} from "../config/tokens";
import {TokenRequest} from "../framework/requestTypes/tokenRequest";

export function registerTokenRoutes(router : Router) {
    const tokenRouter = Router();
    const authController = container.resolve<IAuthController>(Tokens.authController);

    tokenRouter.use(tokenMiddleware, (req, res, next) => {
        const tokenRequest = req as TokenRequest
        authController.midlewareToken(tokenRequest, res, next)
    })
    router.use(tokenRouter)
    new GroupRoutes().registerGroupRoutes(tokenRouter);
    new EventRoutes().registerEventRoutes(tokenRouter);
    new InviteRoutes().registerInviteRoutes(tokenRouter);
    new ExpenseRoutes().registerExpenseRoutes(tokenRouter);
}