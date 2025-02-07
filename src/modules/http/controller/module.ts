import {Module, ModuleControllerInterface, ModuleInterface} from "$core/module";
import HttpController from "$httpModule/controller/action";
import {HttpConfig} from "$httpModule/types.ts";

export default class HttpModule
    extends Module
    implements ModuleInterface {

    actions: ModuleControllerInterface;

    constructor(config: HttpConfig) {
        super();

        if (config === null) {
            throw new Error(`Config is required`);
        }

        this.actions = new HttpController(config.BaseUrl, config.Token);
    }
}