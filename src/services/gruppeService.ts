import {IGruppeService} from "../interfaces/iGruppeService";
import { GruppeAnlegenWebApiRequest } from "../controllers/group/gruppeAnlegenWebApiRequest";
import {ifEmpty} from "../utils/validator";
import {pushRange} from "../utils/list";
import {singleton} from "tsyringe";
import {registerAs} from "../utils/decorator";
import {Tokens} from "../config/tokens";
import {Error} from "../error/error";
import {TextNotFoundError, UsernameTooLongError} from "../error/validationError";

@registerAs(Tokens.gruppeService)
@singleton()
export class GruppeService implements IGruppeService {
    validate(request: GruppeAnlegenWebApiRequest): Error[] {
        const errors : Error[] = [];
        pushRange(this.validateBezeichnung(request.gruppenName),errors);
        return errors;
    }

    private validateBezeichnung(bezeichnung : string) : Error[] {
        const errors : Error[] = [];
        if(ifEmpty(bezeichnung)) {
            errors.push(new TextNotFoundError());
        }
        if(bezeichnung.length > 100) {
            errors.push(new UsernameTooLongError())
        }
        return errors;
    }

}