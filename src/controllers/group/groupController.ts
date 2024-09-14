import {BaseController} from "../../framework/baseController";
import { Response} from "express";
import {IGroupController} from "../../interfaces/iGroupController";
import {IGruppeFactory} from "../../interfaces/iGruppeFactory";
import {IGruppeService} from "../../interfaces/iGruppeService";
import {getUserId} from "../../utils/token";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {registerAs} from "../../utils/decorator";
import {IGruppeRepository} from "../../interfaces/iGruppeRepository";
import {TokenRequest} from "../../framework/requestTypes/tokenRequest";
import {GroupUebersichtDto, GroupUebersichtResponse} from "./response/groupUebersichtResponse";
import {GroupAnlegenRequestBody} from "./bodies/groupAnlegenRequestBody";

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

    async getGroups(req : TokenRequest, res : Response) {
        const userId = getUserId(req.token);
        let gruppen = await this.gruppeRepository.ladeGruppenZumBenutzer(userId);
        if(gruppen == null) {
            gruppen = [];
        }
        let dtos = gruppen.flatMap(g => {
            return new GroupUebersichtDto(g.id, g.bezeichnung)
        })
        return res.status(200).json(new GroupUebersichtResponse(dtos))
    }


    async create(req: TokenRequest, res: Response) {
        const request = req.getCastedBody<GroupAnlegenRequestBody>()
        const validationErrors = this.service.validate(request);
        console.log(request)
        if (validationErrors.length > 0) {
            return res.status(409).json({errors: validationErrors});
        }
        const gruppe = await this.factory.erzeugeGruppe(
            request.name, getUserId(req.token));
        return res.status(200).json({groupId: gruppe.id})
    }
}