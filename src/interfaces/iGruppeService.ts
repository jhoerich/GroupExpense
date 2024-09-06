import {GruppeAnlegenWebApiRequest} from "../controllers/group/gruppeAnlegenWebApiRequest";

export interface IGruppeService {
    validate(request : GruppeAnlegenWebApiRequest) : string[];
}