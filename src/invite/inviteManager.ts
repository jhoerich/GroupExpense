import { UUID } from "crypto";
import {IInviteManager} from "../interfaces/iInviteManager";
import {inject, injectable} from "inversify";
import {Einladung} from "../models/einladung";
import {TYPES} from "../config/types.config";
import {IEinladungRepository} from "../interfaces/iEinladungRepository";

@injectable()
export class InviteManager implements IInviteManager {
    constructor(
        //@inject(TYPES.IEinladungRepository) private einladungRepository: IEinladungRepository)
    ){}

    async createEinladung(gruppeId: UUID): Promise<string> {
        //const einladung = await Einladung.createEinladung(gruppeId);
        //return `http://localhost:8080/join/${einladung.id}`;
        return ""
    }

    async ermittleGruppeZurEinladungId(einladungId : UUID) : Promise<UUID | null> {
        /*
        const einladung = await this.einladungRepository.ladeEinladungZurId(einladungId);
        if(new Date(einladung.erstelltAm).getDate() - new Date().getTime() > 3600000) {
            return null;
        }
        return einladung.gruppeId;
           */
        return null;
    }

}