import {IWebApiRequest} from "../../framework/webApiRequest";
import {UUID} from "node:crypto";

export class GruppeAnlegenWebApiRequest implements IWebApiRequest {
    constructor(
        public token : string,
        public longTermToken: string,
        public gruppenName : string,
        public userId : UUID) {
    }
}