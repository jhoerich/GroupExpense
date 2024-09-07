import {inject, injectable} from "inversify";
import {BaseController} from "../../framework/baseController";
import {Request, Response} from "express";
import {GruppeAnlegenWebApiRequest} from "./gruppeAnlegenWebApiRequest";
import {IGroupController} from "../../interfaces/iGroupController";
import {IGruppeFactory} from "../../interfaces/iGruppeFactory";
import {TYPES} from "../../config/types.config";
import {IGruppeService} from "../../interfaces/iGruppeService";
import {GruppenEinladungErstellenWebApiRequest} from "./gruppenEinladungErstellenWebApiRequest";
import {IInviteManager} from "../../interfaces/iInviteManager";
import {getUserId} from "../../utils/token";

@injectable()
export class GroupController extends BaseController implements IGroupController {
    constructor(
        @inject(TYPES.IGruppeService) private service: IGruppeService,
        @inject(TYPES.IGruppeFactory) private factory: IGruppeFactory,
        //@inject(TYPES.IInviteManager) private inviteManager: IInviteManager
    ) {
        super();
    }

    async create(req: Request, res: Response) {
        const request = this.getRequest<GruppeAnlegenWebApiRequest>(req);
        const validationErrors = this.service.validate(request);
        if (validationErrors.length > 0) {
            return res.status(409).json({errors: validationErrors});
        }
        const gruppe = await this.factory.erzeugeGruppe(
            request.gruppenName, getUserId(request.token));
        return res.status(200).json({gruppeId: gruppe.id})
    }

    async einladen(req: Request, res: Response) {
        const request = this.getRequest<GruppenEinladungErstellenWebApiRequest>(req);
        //const einladung = await this.inviteManager.createEinladung(request.gruppeId);
        return res.status(201)//.json({einladung})
    }

    beitreten(req: Request, res: Response): Promise<Response | undefined> {
        throw new Error("Method not implemented.");
    }
}