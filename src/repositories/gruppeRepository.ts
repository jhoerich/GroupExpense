import { UUID } from "crypto";
import {IGruppeRepository} from "../interfaces/iGruppeRepository";
import {Gruppe} from "../models/gruppe";
import {injectable} from "inversify";

@injectable()
export class GruppeRepository implements IGruppeRepository {
    /*async ladeGruppeZurId(gruppeId: UUID): Promise<Gruppe> {
        const gruppe = await Gruppe.findOneBy({id: gruppeId})
        if(!gruppe) {
            throw new Error(`Gruppe zur Id ${gruppeId} nicht gefunden.`);
        }
        return gruppe;
    }*/
}