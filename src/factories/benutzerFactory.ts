import {Benutzer} from "../models/benutzer";
import {injectable} from "inversify";
import {IBenutzerFactory} from "../interfaces/iBenutzerFactory";

@injectable()
export class BenutzerFactory implements IBenutzerFactory {
    async erzeugeBenutzer(benutzerName : string, email: string, paasswortHash : string) : Promise<Benutzer> {
        const benutzer = new Benutzer()
        benutzer.benutzername = benutzerName;
        benutzer.email = email;
        benutzer.passwortHash = paasswortHash;
        await Benutzer.save(benutzer);
        return benutzer;
    }
}