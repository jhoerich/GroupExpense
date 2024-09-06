export class AuthRegisterWebApiRequest {
    constructor(public email : string,
                public benutzername : string,
                public password1 : string,
                public password2 : string) {
    }
}