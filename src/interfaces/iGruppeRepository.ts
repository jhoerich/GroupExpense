import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";

export interface IGruppeRepository{
    ladeGruppeZurId(gruppeId: UUID) : Promise<Gruppe | null>;
    ladeGruppeFuerBenutzerHinzufuegen(gruppeId : UUID) : Promise<Gruppe | null>;
    ladeGruppeFuerAusgabeHinzufuegen(gruppeId : UUID, benutzerId : UUID) : Promise<Gruppe | null>;
    ladeGruppenZumBenutzer(userId : UUID) : Promise<Gruppe[] | null>;
}
