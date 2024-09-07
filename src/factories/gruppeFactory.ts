import {injectable} from "inversify";
import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";
import {IGruppeFactory} from "../interfaces/iGruppeFactory";

@injectable()
export class GruppeFactory implements IGruppeFactory {
    constructor() {}

    async erzeugeGruppe(bezeichnung : string, userId : UUID) : Promise<Gruppe> {
        return await Gruppe.createGruppe(bezeichnung, userId);
    }
}