import {IApiRequestBody} from "../../../framework/apiRequestBody";

export class AuthLoginBody implements IApiRequestBody {
    constructor(
        public username: string,
        public password: string
    ) {}
}