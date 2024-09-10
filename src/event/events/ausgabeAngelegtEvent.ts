import {ServerEvent} from "../serverEvent";
import {UUID} from "node:crypto";

export class AusgabeAngelegtEvent implements ServerEvent {
    public name = "AusgabeAngelegtEvent";

    constructor(
        public userIds : UUID[],
        public gruppeId : UUID
    ) {
    }
}