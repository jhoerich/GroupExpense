import jwt from 'jsonwebtoken';
import {UUID} from "node:crypto";

const key = "Qn7JkVDWwv+d`qfTP?a";

export function generateToken(userId : UUID) {
    return jwt.sign({userId}, key, {expiresIn: "1h"} );
}

export function generateLongTermToken(userId : UUID) {
    return jwt.sign({userId}, key, {expiresIn: "7d"} );
}

export function verifyToken(token: string, callback: (err: any, decoded: any) => void) {
    jwt.verify(token, key, (err, decoded) => {
        callback(err, decoded);
    })
}