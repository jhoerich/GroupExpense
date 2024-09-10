import {Benutzer} from "../models/benutzer";
import {IBenutzerFactory} from "../interfaces/iBenutzerFactory";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.benutzerFactory)
@singleton()
export class BenutzerFactory implements IBenutzerFactory {
    async erzeugeBenutzer(benutzerName : string, email: string, paasswortHash : string) : Promise<Benutzer> {
        return await Benutzer.createBenutzer(benutzerName, email, paasswortHash);
    }
}