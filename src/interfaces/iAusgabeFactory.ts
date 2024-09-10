import {AusgabeAnlegenDto} from "../controllers/expense/ausgabeAnlegenWebApiRequest";
import {UUID} from "node:crypto";
import {Ausgabe} from "../models/ausgabe";

export interface IAusgabeFactory {
    create(dto : AusgabeAnlegenDto, benutzerGruppeZuoId : UUID) : Promise<Ausgabe>;
}