import {UUID} from "node:crypto";
import {Benutzer} from "../models/benutzer";
import {IBenutzerRepository} from "../interfaces/iBenutzerRepository";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.benutzerRepository)
@singleton()
export class BenutzerRepository implements IBenutzerRepository {
    async ladeBenutzer(benutzerId : UUID) : Promise<Benutzer | null> {
        return await Benutzer.findOneBy({id:benutzerId});
    }

    async ermittleBenutzerZumBenutzernamen(name : string) : Promise<Benutzer | null>{
        return await Benutzer
            .createQueryBuilder("benutzer")
            .where("benutzer.benutzername = :name")
            .setParameter("name", name)
            .getOne()
    }

    async ermittleBenutzerZurMail(mail : string) : Promise<Benutzer | null> {
        return await Benutzer.findOneBy({email:mail});
    }
}