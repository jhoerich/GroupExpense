import {IApiRequestBody} from "../../../framework/apiRequestBody";

export class AuthRefreshBody implements IApiRequestBody {
    constructor(
        public token : string,
        public longTermToken : string
    ) {}
}