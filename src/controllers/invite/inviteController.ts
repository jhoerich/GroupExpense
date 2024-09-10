import {registerAs} from "../../utils/decorator";
import {Tokens} from "../../config/tokens";
import {IInviteController} from "../../interfaces/iInviteController";
import {inject, injectable} from "tsyringe";
import {IEinladungRepository} from "../../interfaces/iEinladungRepository";
import {UUID} from "crypto";
import {Einladung} from "../../models/einladung";
import {BaseController} from "../../framework/baseController";
import {IGruppeRepository} from "../../interfaces/iGruppeRepository";
import {IEventManager} from "../../interfaces/iEventManager";
import {Request, Response} from "express";
import {verifyToken} from "../../utils/token";
import {BenutzerZurGruppeHinzugefuegtEvent} from "../../event/events/benutzerZurGruppeHinzugefuegtEvent";
import {EinladungAnlegenWebApiRequest} from "./einladungAnlegenWebApiRequest";
import {EinladungAnnehmenWebApiRequest} from "./einladungAnnehmenWebApiRequest";
import {InvalidInviteError, InvalidOrExpiredTokenError} from "../../error/authError";
import {GroupNotFoundError} from "../../error/entityError";

@registerAs(Tokens.inviteController)
@injectable()
export class InviteController extends BaseController implements IInviteController {
    constructor(
        @inject(Tokens.einladungRepository) private readonly einladungRepository: IEinladungRepository,
        @inject(Tokens.gruppeRepository) private readonly gruppeRepository: IGruppeRepository,
        @inject(Tokens.eventManager) private readonly eventManager: IEventManager,
    )
    {
        super();
    }

    async einladen(req: Request, res: Response) {
        const request = this.getRequest<EinladungAnlegenWebApiRequest>(req);
        const einladung = await Einladung.createEinladung(request.gruppeId);
        return res.status(201).json({einladung:`http://localhost:3000/api/join/${einladung.id}`})
    }

    async beitreten(req: Request, res: Response): Promise<Response | undefined> {
        const partialRequest = req.body as Partial<EinladungAnnehmenWebApiRequest>;
        if(!partialRequest.token) {
            return res.status(404).json({error: new InvalidOrExpiredTokenError()})
        }
        const { token } = req.params;
        const einladung = await this.einladungRepository.ladeEinladungZurId(token as UUID);
        if(new Date(einladung.erstelltAm).getDate() - new Date().getTime() > 3600000) {
            return res.status(404).json({error: new InvalidInviteError()})
        }
        const request = this.getRequest<EinladungAnnehmenWebApiRequest>(req);
        let userId : UUID;
        verifyToken(request.token, (err, decode) => {
            if (err) {
                return res.status(403).json({ error: new InvalidOrExpiredTokenError()});
            }
            userId = decode.userId;
        })

        const gruppe = await this.gruppeRepository.ladeGruppeFuerBenutzerHinzufuegen(einladung.gruppeId);
        if(gruppe == null) {
            return res.status(404).json({error: new GroupNotFoundError()})
        }
        await gruppe.benutzerHinzufuegen(userId!, request.sollBerechnetWerdenAb);
        const benutzerIds : UUID[] = gruppe.benutzerGruppenZuordnungen.flatMap(bgz =>{
            return bgz.benutzerId as UUID
        });
        const event = new BenutzerZurGruppeHinzugefuegtEvent(benutzerIds);
        this.eventManager.sendEventToAllClients(event);
        return res.status(200).json({message:"User added!"})
    }
}