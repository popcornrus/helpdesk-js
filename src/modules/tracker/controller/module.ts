import {ConfigInterface, Module, ModuleControllerInterface, ModuleInterface} from "$core/module";
import TrackerController from "./action";

export default class TrackerModule
    extends Module
    implements ModuleInterface {

    #config: ConfigInterface;
    actions: ModuleControllerInterface;

    constructor(config: ConfigInterface) {
        super();
        this.#config = config;
        this.actions = new TrackerController();
    }
}