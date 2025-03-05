import HttpController from "$httpModule/controller/service.ts";
import {HttpConfig} from "$httpModule/types.ts";
import {ModuleBase} from "$core/module/instance";
import {ControllerDI} from "$src/modules";

export default class HttpModule
    extends ModuleBase {

    actions: HttpController;

    constructor(di: ControllerDI, config: HttpConfig) {
        super();

        if (config === null) {
            throw new Error(`Config is required`);
        }

        this.actions = new HttpController(di, config);
    }
}