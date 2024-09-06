import { Container } from "inversify";
import {TYPES} from "./types.config";
import {IAuthService} from "../interfaces/iAuthService";
import {IBenutzerRepository} from "../interfaces/iBenutzerRepository";
import {BenutzerRepository} from "../repositories/benutzerRepository";
import {IBenutzerFactory} from "../interfaces/iBenutzerFactory";
import {BenutzerFactory} from "../factories/benutzerFactory";
import {AuthService} from "../services/authService";
import {IAuthController} from "../interfaces/iAuthController";
import {AuthController} from "../controllers/auth/authController";
import {IGruppeFactory} from "../interfaces/iGruppeFactory";
import {GruppeFactory} from "../factories/gruppeFactory";
import {IGruppeRepository} from "../interfaces/iGruppeRepository";
import {GruppeRepository} from "../repositories/gruppeRepository";
import {IGruppeService} from "../interfaces/iGruppeService";
import {GruppeService} from "../services/gruppeService";
import {GroupController} from "../controllers/group/groupController";
import {IGroupController} from "../interfaces/iGroupController";
import {IEventManager} from "../interfaces/iEventManager";
import {EventManager} from "../event/eventManager";

const container = new Container();
container.bind<IBenutzerRepository>(TYPES.IBenutzerRepository).to(BenutzerRepository);
container.bind<IBenutzerFactory>(TYPES.IBenutzerFactory).to(BenutzerFactory);
container.bind<IGruppeFactory>(TYPES.IGruppeFactory).to(GruppeFactory);
container.bind<IGruppeRepository>(TYPES.IGruppeRepository).to(GruppeRepository);
container.bind<IGruppeService>(TYPES.IGruppeService).to(GruppeService)
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IGroupController>(TYPES.IGroupController).to(GroupController)
container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);
container.bind<IEventManager>(TYPES.IEventManager).to(EventManager);
export { container };

