import {GruppeAnlegenWebApiRequest} from "../controllers/group/gruppeAnlegenWebApiRequest";
import {Error} from "../error/error";

export interface IGruppeService {
    validate(request : GruppeAnlegenWebApiRequest) : Error[];
}