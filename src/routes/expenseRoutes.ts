import {Router} from "express";
import {container} from "tsyringe";
import {IAuthController} from "../interfaces/iAuthController";
import {Tokens} from "../config/tokens";
import {IExpenseController} from "../interfaces/IExpenseController";

export class ExpenseRoutes {
    registerExpenseRoutes(router: Router) {
        const authController = container.resolve<IAuthController>(Tokens.authController);
        const expenseController = container.resolve<IExpenseController>(Tokens.expenseController)
        const expenseRouterForGroups = Router();
        expenseRouterForGroups.post("/:groupId/expense", expenseController.create.bind(expenseController));
        router.use('/group', expenseRouterForGroups)

    }
}