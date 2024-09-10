import {BaseController} from "../../framework/baseController";
import {Request, Response} from "express";
import {GruppeAnlegenWebApiRequest} from "./gruppeAnlegenWebApiRequest";
import {IGroupController} from "../../interfaces/iGroupController";
import {IGruppeFactory} from "../../interfaces/iGruppeFactory";
import {IGruppeService} from "../../interfaces/iGruppeService";
import {getUserId} from "../../utils/token";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {registerAs} from "../../utils/decorator";
import {IGruppeRepository} from "../../interfaces/iGruppeRepository";

@registerAs(Tokens.groupController)
@injectable()
export class GroupController extends BaseController implements IGroupController {
    constructor(
        @inject(Tokens.gruppeService) private readonly service: IGruppeService,
        @inject(Tokens.gruppeFactory) private readonly factory: IGruppeFactory,
        @inject(Tokens.gruppeRepository) private readonly gruppeRepository: IGruppeRepository
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
}