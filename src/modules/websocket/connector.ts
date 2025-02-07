import {ConfigInterface, ModuleConnector, ModuleInterface} from "$core/module";
import WebsocketModule from "$src/modules/websocket/controller/module.ts";
import {HttpConfig} from "$httpModule/types.ts";

export default class WebsocketConnector extends ModuleConnector {
    instance: ModuleInterface = new WebsocketModule(this.GetConfig());

    GetConfig(): HttpConfig {
        return this.config as HttpConfig;
    }

    GetTitle(): string {
        return 'Websocket';
    }
}