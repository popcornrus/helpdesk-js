import {ModuleConnectorInterface, ModuleInterface} from "$core/module";
import {HttpConfig} from "$httpModule/types.ts";
import HttpModule from "$httpModule/controller/module.ts";

export default class HttpConnector implements ModuleConnectorInterface{
    config: HttpConfig | null = null;
    instance: ModuleInterface | null = null;

    SetConfig(config: HttpConfig) {
        this.config = config;
    }

    GetConfig(): HttpConfig {
        return this.config;
    }

    connect() {
        this.instance = new HttpModule(this.config);
    }

    GetConfigType(): string {
        return "HttpConfig";
    }

    GetTitle(): string {
        return "Http";
    }

    GetInstance(): ModuleInterface {
        return this.instance;
    }
}