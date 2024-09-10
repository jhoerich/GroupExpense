import {UUID} from "node:crypto";
import { Response } from "express";

export class EventClient {
    constructor(userId: UUID, response: Response) {
        this.userId = userId;
        this.response = response;
    }
    public userId! : UUID;
    public response! : Response;
}