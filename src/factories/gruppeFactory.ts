import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";
import {IGruppeFactory} from "../interfaces/iGruppeFactory";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.gruppeFactory)
@singleton()
export class GruppeFactory implements IGruppeFactory {
    constructor() {}

    async erzeugeGruppe(bezeichnung : string, userId : UUID) : Promise<Gruppe> {
        return await Gruppe.createGruppe(bezeichnung, userId);
    }
}