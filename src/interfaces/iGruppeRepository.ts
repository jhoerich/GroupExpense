import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";

export interface IGruppeRepository{
    ladeGruppeZurId(gruppeId: UUID) : Promise<Gruppe>;
    ladeGruppeFuerBenutzerHinzufuegen(gruppeId : UUID) : Promise<Gruppe>;
}
