import {inject, injectable} from "inversify";
import {UUID} from "node:crypto";
import {Gruppe} from "../models/gruppe";
import {TYPES} from "../config/types.config";
import {IGruppeFactory} from "../interfaces/iGruppeFactory";
import {IBenutzerRepository} from "../interfaces/iBenutzerRepository";

@injectable()
export class GruppeFactory implements IGruppeFactory {
    constructor(
        @inject(TYPES.IBenutzerRepository) private benutzerRepository: IBenutzerRepository) {
    }

    async erzeugeGruppe(bezeichnung : string, userId : UUID) : Promise<Gruppe> {
        const gruppe = new Gruppe();
        const benutzer = await this.benutzerRepository.ladeBenutzer(userId);
        gruppe.bezeichnung = bezeichnung;
        gruppe.benutzer = benutzer;
        await gruppe.save();
        return gruppe;
    }
}