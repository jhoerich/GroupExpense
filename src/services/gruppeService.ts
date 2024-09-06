import {IGruppeService} from "../interfaces/iGruppeService";
import { GruppeAnlegenWebApiRequest } from "../controllers/group/gruppeAnlegenWebApiRequest";
import {ifEmpty} from "../utils/validator";
import {pushRange} from "../utils/list";
import {injectable} from "inversify";

@injectable()
export class GruppeService implements IGruppeService {
    validate(request: GruppeAnlegenWebApiRequest): string[] {
        const errors : string[] = [];
        pushRange(this.validateBezeichnung(request.gruppenName),errors);
        return errors;
    }

    private validateBezeichnung(bezeichnung : string) : string[] {
        const errors : string[] = [];
        if(ifEmpty(bezeichnung)) {
            errors.push("Es wurde keine Bezeichnung gepflegt!");
        }
        if(bezeichnung.length > 100) {
            errors.push("Die Bezeichnung ist zu lang!")
        }
        return errors;
    }

}