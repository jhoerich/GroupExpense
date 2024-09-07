import { UUID } from "crypto";
import {IInviteManager} from "../interfaces/iInviteManager";
import {Einladung} from "../models/einladung";
import {IEinladungRepository} from "../interfaces/iEinladungRepository";
import {inject, injectable} from "tsyringe";
import {Tokens} from "../config/tokens";
import {registerAs} from "../utils/decorator";

@registerAs(Tokens.inviteManager)
@injectable()
export class InviteManager implements IInviteManager {
    constructor(
        @inject(Tokens.einladungRepository) private readonly einladungRepository: IEinladungRepository)
    {}

    async createEinladung(gruppeId: UUID): Promise<string> {
        const einladung = await Einladung.createEinladung(gruppeId);
        return `http://localhost:3000/api/join/${einladung.id}`;
    }

    async ermittleGruppeZurEinladungId(einladungId: UUID): Promise<UUID | null> {
        const einladung = await this.einladungRepository.ladeEinladungZurId(einladungId);
        if(new Date(einladung.erstelltAm).getDate() - new Date().getTime() > 3600000) {
            return null;
        }
        return einladung.gruppeId;
    }

}