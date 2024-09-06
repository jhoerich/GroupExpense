import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";

export interface IGruppeFactory {
    erzeugeGruppe(bezeichnung : string, userId : UUID) : Promise<Gruppe>;
}
