import {ApiRequest} from "../apiRequest";

export interface TokenRequest extends ApiRequest{
    token : string;
}