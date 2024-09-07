import {IWebApiRequest} from "../../framework/webApiRequest";

export class GruppeAnlegenWebApiRequest implements IWebApiRequest {
    constructor(
        public token : string,
        public longTermToken: string,
        public gruppenName : string) {
    }
}