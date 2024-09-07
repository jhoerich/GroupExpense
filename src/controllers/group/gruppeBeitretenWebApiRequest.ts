import {IWebApiRequest} from "../../framework/webApiRequest";

export class GruppeBeitretenWebApiRequest implements IWebApiRequest{
    constructor(
        public token: string,
        public longTermToken: string,
        public sollBerechnetWerdenAb : Date) {}
}