import { UUID } from "crypto";
import {IEinladungRepository} from "../interfaces/iEinladungRepository";
import {Einladung} from "../models/einladung";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";

@registerAs(Tokens.einladungRepository)
@singleton()
export class EinladungRepository implements IEinladungRepository {
    async ladeEinladungZurId(id: UUID): Promise<Einladung> {
        const einladung = await Einladung.findOneBy({id: id});
        if(!einladung) {
            throw new Error("Einladung nicht gefunden.");
        }
        return einladung;
    }
}