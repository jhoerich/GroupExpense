import {Benutzer} from "../models/benutzer";

export interface IBenutzerFactory {
    erzeugeBenutzer(benutzerName : string, email: string, paasswortHash : string) : Promise<Benutzer>;
}
