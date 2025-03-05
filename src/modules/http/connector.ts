import {ConfigInterface, ModuleInterface} from "$core/module";
import {HttpConfig} from "$httpModule/types.ts";
import {ModuleBase} from "$core/module/instance";
import {ModuleBaseConnector} from "$core/module/connector";
import HttpModule from "$httpModule/controller/module.ts";
import {ControllerDI} from "$src/modules";

export default class HttpConnector
    extends ModuleBaseConnector {
    config: HttpConfig;
    instance: ModuleInterface | null = null;

    Connect(di: ControllerDI, config: ConfigInterface) {
        this.instance = new HttpModule(di, <HttpConfig>config);
    }

    GetConfigType(): string {
        return "HttpConfig";
    }

    GetTitle(): string {
        return "Http";
    }

    GetInstance(): ModuleBase {
        return this.instance;
    }
}