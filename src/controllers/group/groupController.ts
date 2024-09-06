import {inject, injectable} from "inversify";
import {BaseController} from "../../framework/baseController";
import {Request, Response} from "express";
import {GruppeAnlegenWebApiRequest} from "./gruppeAnlegenWebApiRequest";
import {IGroupController} from "../../interfaces/iGroupController";
import {IGruppeFactory} from "../../interfaces/iGruppeFactory";
import {TYPES} from "../../config/types.config";
import {IGruppeService} from "../../interfaces/iGruppeService";

@injectable()
export class GroupController extends BaseController implements IGroupController {
    constructor(
        @inject(TYPES.IGruppeService) private service: IGruppeService,
        @inject(TYPES.IGruppeFactory) private factory : IGruppeFactory) {
        super();
    }

    async create(req : Request, res : Response) {
        const request = this.getRequest<GruppeAnlegenWebApiRequest>(req);
        const validationErrors = this.service.validate(request);
        if (validationErrors.length > 0) {
            return res.status(409).json({errors: validationErrors});
        }
        const gruppe = await this.factory.erzeugeGruppe(
            request.gruppenName, request.userId);
        return res.status(200).json({gruppeId : gruppe.id})
    }
}