import {Error} from "../error/error";
import {GroupAnlegenRequestBody} from "../controllers/group/bodies/groupAnlegenRequestBody";

export interface IGruppeService {
    validate(request : GroupAnlegenRequestBody) : Error[];
}