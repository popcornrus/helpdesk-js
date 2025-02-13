import {Module, ModuleControllerInterface, ModuleInterface} from "$core/module";
import {WebsocketConfig} from "$websocketModule/types.ts";
import WebsocketController from "$websocketModule/controller/action.ts";

export default class WebsocketModule
    extends Module
    implements ModuleInterface {

    actions: ModuleControllerInterface;

    constructor(config: WebsocketConfig) {
        super();

        if (config === null) {
            throw new Error(`Config is required`);
        }

        this.actions = new WebsocketController(config.url, config.Token);
    }
}