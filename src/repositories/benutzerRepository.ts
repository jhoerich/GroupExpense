import {UUID} from "node:crypto";
import {Benutzer} from "../models/benutzer";
import {IBenutzerRepository} from "../interfaces/iBenutzerRepository";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.benutzerRepository)
@singleton()
export class BenutzerRepository implements IBenutzerRepository {
    async ladeBenutzer(benutzerId : UUID) : Promise<Benutzer> {
        const benutzer = await Benutzer.findOneBy({id:benutzerId})
        if (benutzer == null) {
            throw new Error("Benutzer not found.");
        }
        return benutzer;
    }

    async ermittleBenutzerZumBenutzernamen(name : string) : Promise<Benutzer | null>{
        return await Benutzer.findOneBy({benutzername:name})
    }

    async ermittleBenutzerZurMail(mail : string) : Promise<Benutzer | null> {
        return await Benutzer.findOneBy({email:mail});
    }
}