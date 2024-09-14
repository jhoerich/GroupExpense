import {Request, Response, Router} from "express";
import {IGroupController} from "../../interfaces/iGroupController";
import {container} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {TokenRequest} from "../../framework/requestTypes/tokenRequest";

export class GroupRoutes {
    registerGroupRoutes(router: Router) {
        const controller = container.resolve<IGroupController>(Tokens.groupController);
        const groupRoutes = Router()

        const prefix = '/group'
        router.use(prefix, groupRoutes)

        groupRoutes.post('*', (req : Request, res : Response) => {
            const request = req as TokenRequest;
            switch (request.apiKey.replace(prefix, '')) {
                case "/uebersicht":
                    return controller.getGroups(request, res);
                case "/create":
                    return controller.create(request, res);
            }
        })
    }
}