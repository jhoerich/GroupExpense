import {IWebApiRequest} from "../../framework/webApiRequest";
import {UUID} from "node:crypto";

export class AusgabeAnlegenWebApiRequest implements IWebApiRequest{
    constructor(
        public token : string,
        public longTermToken : string,
        public dto : AusgabeAnlegenDto
    ) {
    }
}

export class AusgabeAnlegenDto {
    constructor(
        public beschreibung: string,
        public betrag: number,
        public waehrung: UUID,
        public aufteilungDtos: AusgabenAufteilungDto[]
    ) {
    }
}

export class AusgabenAufteilungDto {
    constructor(
        public betrag: number | null,
        public benutzerId: UUID
    ) {
    }
}