import {ServerEvent} from "../serverEvent";
import {UUID} from "node:crypto";

export class BenutzerZurGruppeHinzugefuegtEvent implements ServerEvent {
    public name = "BenutzerZurGruppeHinzugefuegtEvent";

    constructor(
        public userIds : UUID[] = [],
    ) {}
}