import {UUID} from "node:crypto";

export class Event {
    name! : string;
    userId! : UUID;
}