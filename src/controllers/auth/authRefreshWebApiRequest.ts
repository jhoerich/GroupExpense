export class AuthRefreshWebApiRequest {
    constructor(
        public token : string,
        public longTermToken : string
    ) {}
}