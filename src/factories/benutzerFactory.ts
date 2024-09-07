import {Benutzer} from "../models/benutzer";
import {injectable} from "inversify";
import {IBenutzerFactory} from "../interfaces/iBenutzerFactory";

@injectable()
export class BenutzerFactory implements IBenutzerFactory {
    async erzeugeBenutzer(benutzerName : string, email: string, paasswortHash : string) : Promise<Benutzer> {
        return await Benutzer.createBenutzer(benutzerName, email, paasswortHash);
    }
}