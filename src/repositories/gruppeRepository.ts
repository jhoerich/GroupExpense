import { UUID } from "crypto";
import {IGruppeRepository} from "../interfaces/iGruppeRepository";
import {Gruppe} from "../models/gruppe";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.gruppeRepository)
@singleton()
export class GruppeRepository implements IGruppeRepository {
    async ladeGruppeZurId(gruppeId: UUID): Promise<Gruppe> {
        const gruppe = await Gruppe.findOneBy({id: gruppeId})
        if(!gruppe) {
            throw new Error(`Gruppe zur Id ${gruppeId} nicht gefunden.`);
        }
        return gruppe;
    }

    async ladeGruppeFuerBenutzerHinzufuegen(gruppeId : UUID) : Promise<Gruppe> {
        const gruppe = await Gruppe
            .createQueryBuilder("gruppe")
            .innerJoinAndSelect("gruppe.benutzerGruppenZuordnungen", "benutzerGruppenZuordnungen")
            .where("gruppe.id = :id")
            .setParameter("id", gruppeId)
            .getOne();
        if(!gruppe) {
            throw new Error(`Gruppe zur Id ${gruppeId} nicht gefunden.`);
        }
        return gruppe;
    }

    async ladeGruppeFuerAusgabeHinzufuegen(gruppeId: UUID, benutzerId: UUID): Promise<Gruppe> {
        const gruppe = await Gruppe
            .createQueryBuilder("gruppe")
            .innerJoinAndSelect("gruppe.benutzerGruppenZuordnungen", "benutzerGruppenZuordnungen", "benutzerGruppenZuordnungen.benutzerId = :benutzerId")
            .where("gruppe.id = :id")
            .setParameters({"id": gruppeId, "benutzerId": benutzerId})
            .getOne()
        if(!gruppe) {
            throw new Error(`Gruppe zur Id ${gruppeId} nicht gefunden.`);
        }
        return gruppe;
    }
}