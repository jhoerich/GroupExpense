import {UUID} from "node:crypto";

export interface IInviteManager {
    createEinladung(gruppeId : UUID) : Promise<string>;
    ermittleGruppeZurEinladungId(einladungId : UUID) : Promise<UUID | null>;
}