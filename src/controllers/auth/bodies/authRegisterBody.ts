import {IApiRequestBody} from "../../../framework/apiRequestBody";

export class AuthRegisterBody implements IApiRequestBody{
    constructor(public email : string,
                public benutzername : string,
                public password1 : string,
                public password2 : string) {
    }
}