import {Error} from "./error";

export class EmailNotFoundError implements Error {
    key: string = 'ERROR_EMAIL_NOT_FOUND';
    message: string = 'E-Mail not found!';
}

export class EmailTooLongError implements Error {
    key: string = 'ERROR_EMAIL_TO_LONG';
    message: string = 'E-Mail too long!';
}

export class EmailWrongFormatError implements Error {
    key: string = 'ERROR_EMAIL_WRONG_FORMAT';
    message: string = 'E-Mail wrong format!';
}

export class EmailIsAlreadyInUse implements Error {
    key: string = 'ERROR_EMAIL_IS_ALREADY_IN_USE';
    message: string = 'E-Mail is already in use!';
}

export class TextNotFoundError implements Error {
    key: string = 'ERROR_TEXT_NOT_FOUND';
    message : string = 'Text not found!';
}

export class UsernameTooLongError implements Error {
    key: string = 'ERROR_USERNAME_TOO_LONG';
    message : string = 'Username too long!';
}

export class UsernameIsAlreadyInUse implements Error {
    key: string = 'ERROR_USERNAME_IS_ALREADY_IN_USE';
    message : string = 'Username is already in use!';
}

export class PasswordIsNotIdenticError implements Error {
    key: string = 'ERROR_PASSWORD_IS_NOT_IDENTIC';
    message : string = 'Password is not identic!';
}