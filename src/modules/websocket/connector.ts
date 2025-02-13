import {ModuleConnectorInterface, ModuleInterface} from "$core/module";
import WebsocketModule from "$websocketModule/controller/module";
import {WebsocketConfig} from "$websocketModule/types";

export default class WebsocketConnector implements ModuleConnectorInterface{
    config: WebsocketConfig | null = null;
    instance: ModuleInterface | null = null;

    SetConfig(config: WebsocketConfig) {
        this.config = config;
    }

    GetConfig(): WebsocketConfig {
        return this.config;
    }

    connect() {
        this.instance = new WebsocketModule(this.config);
    }

    GetConfigType(): string {
        return "WebsocketConfig";
    }

    GetTitle(): string {
        return "Websocket";
    }

    GetInstance(): ModuleInterface {
        return this.instance;
    }
}