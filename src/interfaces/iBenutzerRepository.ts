import {UUID} from "node:crypto";
import {Benutzer} from "../models/benutzer";

export interface IBenutzerRepository {
    ladeBenutzer(benutzerId : UUID) : Promise<Benutzer>;
    ermittleBenutzerZumBenutzernamen(name : string) : Promise<Benutzer | null>;
    ermittleBenutzerZurMail(mail : string) : Promise<Benutzer | null>;
}