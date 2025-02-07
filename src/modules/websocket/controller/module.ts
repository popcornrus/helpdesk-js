import {ConfigInterface, Module, ModuleControllerInterface, ModuleInterface} from "$core/module";
import WebsocketController from "$httpModule/controller/action";
import {HttpConfig} from "$httpModule/types.ts";

export default class WebsocketModule
    extends Module
    implements ModuleInterface {

    #config: HttpConfig;
    controller: ModuleControllerInterface;

    constructor(config: HttpConfig) {
        super();

        this.#config = config;

        this.controller = new WebsocketController(
            this.#config.BaseUrl,
            this.#config.Token,
        );
    }
}