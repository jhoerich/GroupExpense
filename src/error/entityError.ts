import {Error} from "./error";

export class GroupNotFoundError implements Error {
    key : string = "ERROR_GROUP_NOT_FOUND";
    message : string = "Group not found!";
}

export class UserNotFoundError implements Error {
    key : string = "ERROR_USER_NOT_FOUND";
    message : string = "User not found!";
}