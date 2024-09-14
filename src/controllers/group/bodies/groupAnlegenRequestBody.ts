import {IApiRequestBody} from "../../../framework/apiRequestBody";

export class GroupAnlegenRequestBody implements IApiRequestBody {
    constructor(
        public name : string
    ) {}
}