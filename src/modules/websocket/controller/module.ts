import {ModuleBase} from "$core/module";
import {WebsocketConfig} from "$websocketModule/types.ts";
import WebsocketController from "$websocketModule/controller/service.ts";
import {ControllerDI} from "$src/modules";

export default class WebsocketModule
    extends ModuleBase {

    actions: WebsocketController;

    constructor(di: ControllerDI, config: WebsocketConfig) {
        super();

        if (config === null) {
            throw new Error(`Config is required`);
        }

        this.actions = new WebsocketController(di, config);
    }
}