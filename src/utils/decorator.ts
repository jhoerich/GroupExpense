import 'reflect-metadata'
import {container} from "tsyringe";

const META_DATA_KEY = Symbol('interface');

export function registerAs(token: any) {
    return function (target : any) {
        Reflect.defineMetadata(META_DATA_KEY, token, target);
        container.registerSingleton(token, target);
    }
}