import {IWebApiRequest} from "../../framework/webApiRequest";

export class GruppenEinladungErstellenWebApiRequest implements IWebApiRequest{
    constructor(
        public token: string,
        public longTermToken: string) {}
}