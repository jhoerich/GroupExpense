import {IWebApiRequest} from "../../framework/webApiRequest";
import {UUID} from "node:crypto";

export class EinladungAnlegenWebApiRequest implements IWebApiRequest {
    constructor(
        public token : string,
        public longTermToken : string,
        public gruppeId : UUID) {
    }
}
