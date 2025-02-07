import {ConfigInterface, ModuleConnector, ModuleInterface} from "$core/module";

import HttpModule from "$httpModule/controller/module";
import {HttpConfig} from "$httpModule/types.ts";

export default class HttpConnector extends ModuleConnector {
    instance: ModuleInterface | null = null;

    connect() {
        this.instance = new HttpModule(this.config as HttpConfig);
    }

    GetTitle(): string {
        return 'Http';
    }

    GetConfigType(): string {
        return 'HttpConfig';
    }

    GetInstance(): ModuleInterface {
        return this.instance;
    }
}