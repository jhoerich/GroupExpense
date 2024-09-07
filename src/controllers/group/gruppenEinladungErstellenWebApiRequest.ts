import {IWebApiRequest} from "../../framework/webApiRequest";
import {UUID} from "node:crypto";

export class GruppenEinladungErstellenWebApiRequest implements IWebApiRequest{
    constructor(
        public token: string,
        public longTermToken: string,
        public gruppeId : UUID) {}
}