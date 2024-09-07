import {BaseController} from "../../framework/baseController";
import {Request, Response} from "express";
import {GruppeAnlegenWebApiRequest} from "./gruppeAnlegenWebApiRequest";
import {IGroupController} from "../../interfaces/iGroupController";
import {IGruppeFactory} from "../../interfaces/iGruppeFactory";
import {IGruppeService} from "../../interfaces/iGruppeService";
import {IInviteManager} from "../../interfaces/iInviteManager";
import {getUserId, verifyToken} from "../../utils/token";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../../config/tokens";
import {registerAs} from "../../utils/decorator";
import {UUID} from "node:crypto";
import {IGruppeRepository} from "../../interfaces/iGruppeRepository";
import {GruppeBeitretenWebApiRequest} from "./gruppeBeitretenWebApiRequest";
import {IEventManager} from "../../interfaces/iEventManager";
import {BenutzerZurGruppeHinzugefuegtEvent} from "../../event/events/benutzerZurGruppeHinzugefuegtEvent";

@registerAs(Tokens.groupController)
@injectable()
export class GroupController extends BaseController implements IGroupController {
    constructor(
        @inject(Tokens.gruppeService) private readonly service: IGruppeService,
        @inject(Tokens.gruppeFactory) private readonly factory: IGruppeFactory,
        @inject(Tokens.gruppeRepository) private readonly gruppeRepository: IGruppeRepository,
        @inject(Tokens.inviteManager) private readonly inviteManager: IInviteManager,
        @inject(Tokens.eventManager) private readonly eventManager: IEventManager,
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
        const { gruppeId } = req.params;
        const einladung = await this.inviteManager.createEinladung(gruppeId as UUID);
        return res.status(201).json({einladung})
    }

    async beitreten(req: Request, res: Response): Promise<Response | undefined> {
        const partialRequest = req.body as Partial<GruppeBeitretenWebApiRequest>;
        if(!partialRequest.token) {
            return res.status(404).json({error: "Kein Token enthalten!"})
        }
        const { token } = req.params;
        const groupId = await this.inviteManager.ermittleGruppeZurEinladungId(token as UUID);
        if(!groupId) {
            return res.status(404).json({error: "Abgeschlaufene Einladung!"})
        }
        const request = this.getRequest<GruppeBeitretenWebApiRequest>(req);
        let userId : UUID;
        verifyToken(request.token, (err, decode) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token!'});
            }
            userId = decode.userId;
        })

        const gruppe = await this.gruppeRepository.ladeGruppeFuerBenutzerHinzufuegen(groupId);
        await gruppe.benutzerHinzufuegen(userId!, request.sollBerechnetWerdenAb);
        const benutzerIds : UUID[] = gruppe.benutzerGruppenZuordnungen.flatMap(bgz =>{
            return bgz.benutzerId as UUID
        });
        const event = new BenutzerZurGruppeHinzugefuegtEvent(benutzerIds);
        this.eventManager.sendEventToAllClients(event);
        return res.status(200).json({message:"Benutzer ist der Gruppe hinzugefügt!"})
    }
}