import {BaseController} from "../../framework/baseController";
import {registerAs} from "../../utils/decorator";
import {Tokens} from "../../config/tokens";
import {inject, injectable} from "tsyringe";
import {AusgabeAnlegenWebApiRequest} from "./ausgabeAnlegenWebApiRequest";
import {Request, Response} from "express";
import {IAusgabeFactory} from "../../interfaces/iAusgabeFactory";
import {IGruppeRepository} from "../../interfaces/iGruppeRepository";
import {getUserId} from "../../utils/token";
import {UUID} from "node:crypto";
import {IEventManager} from "../../interfaces/iEventManager";
import {AusgabeAngelegtEvent} from "../../event/events/ausgabeAngelegtEvent";
import {IExpenseController} from "../../interfaces/IExpenseController";

@registerAs(Tokens.expenseController)
@injectable()
export class ExpenseController extends BaseController implements IExpenseController{
    constructor(
        @inject(Tokens.ausgabeFactory) private readonly factory: IAusgabeFactory,
        @inject(Tokens.gruppeRepository) private readonly gruppeRepository: IGruppeRepository,
        @inject(Tokens.eventManager) private readonly eventManager: IEventManager,
    ) {
        super();
    }

    async create(req : Request, res : Response) : Promise<Response> {
        const request = this.getRequest<AusgabeAnlegenWebApiRequest>(req);
        const { groupId } = req.params;
        const benutzerId = getUserId(request.token);
        const dto = request.dto;
        const gruppeMitBenutzern = await this.gruppeRepository.ladeGruppeFuerAusgabeHinzufuegen(groupId as UUID, benutzerId)
        await this.factory.create(dto, gruppeMitBenutzern.benutzerGruppenZuordnungen[0].id)
        const benutzerIds = dto.aufteilungDtos.flatMap((c ) => {
            return c.benutzerId
        });
        const event = new AusgabeAngelegtEvent(benutzerIds, groupId as UUID)
        this.eventManager.sendEventToAllClients(event)
        return res.status(200).json({message: "Ausgabe hinzugefügt!"})
    }
}