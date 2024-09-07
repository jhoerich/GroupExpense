import { UUID } from "crypto";
import {IEinladungRepository} from "../interfaces/iEinladungRepository";
import {Einladung} from "../models/einladung";
import {injectable} from "inversify";

@injectable()
export class EinladungRepository implements IEinladungRepository {
    /*async ladeEinladungZurId(id: UUID): Promise<Einladung> {
        const einladung = await Einladung.findOneBy({id: id});
        if(!einladung) {
            throw new Error("Einladung nicht gefunden.");
        }
        return einladung;
    }*/
}