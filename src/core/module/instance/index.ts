import {ModuleControllerInterface, ModuleInterface} from "./interface"
export default class Module implements ModuleInterface {
    controller: ModuleControllerInterface | null;
}