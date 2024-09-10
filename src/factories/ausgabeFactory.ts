import {IAusgabeFactory} from "../interfaces/iAusgabeFactory";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";
import {injectable} from "tsyringe";
import {Ausgabe} from "../models/ausgabe";
import {UUID} from "node:crypto";
import {AusgabeAnlegenDto} from "../controllers/expense/ausgabeAnlegenWebApiRequest";

@registerAs(Tokens.ausgabeFactory)
@injectable()
export class ausgabeFactory implements IAusgabeFactory{
    async create(dto : AusgabeAnlegenDto, benutzerGruppeZuoId : UUID) : Promise<Ausgabe> {
        const ausgabe = await Ausgabe.createAusgabe(dto.beschreibung, dto.betrag, benutzerGruppeZuoId, dto.waehrung)
        const aufteilungen = dto.aufteilungDtos;
        for (const aufteilung of aufteilungen) {
            const betrag = aufteilung.betrag ?? (dto.betrag / aufteilungen.length);
            await ausgabe.ausgabeBenutzerZuordnungHinzufuegen(aufteilung.benutzerId, betrag);
        }
        return ausgabe;
    }
}