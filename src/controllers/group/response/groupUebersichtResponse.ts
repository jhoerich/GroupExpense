import {UUID} from "node:crypto";

export class GroupUebersichtResponse {
    constructor(
        public dtos: GroupUebersichtDto[]
    ) {}
}

export class GroupUebersichtDto {
    constructor(
        public id : UUID,
        public name : String
    ) {}
}