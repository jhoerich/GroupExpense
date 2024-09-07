import 'reflect-metadata'
import {container} from "tsyringe";

const META_DATA_KEY = Symbol('interface');

const TARGETS : any[] = [];

export function registerAs(token: any) {
    return function (target : any) {
        TARGETS.push(target);
        Reflect.defineMetadata(META_DATA_KEY, token, target);
        container.registerSingleton(token, target);
    }
}