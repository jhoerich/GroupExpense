import {UUID} from "node:crypto";

export interface ServerEvent {
    name : string;
    userIds : UUID[];
}