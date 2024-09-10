import {IWebApiRequest} from "../../framework/webApiRequest";

export class EinladungAnnehmenWebApiRequest implements IWebApiRequest{
    constructor(
        public token: string,
        public sollBerechnetWerdenAb : Date) {}
}