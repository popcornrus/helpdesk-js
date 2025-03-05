import {ConfigInterface, ModuleBase, ModuleConnectorInterface} from "$core/module";
import WebsocketModule from "$websocketModule/controller/module";
import {WebsocketConfig} from "$websocketModule/types";
import {ModuleBaseConnector} from "$core/module/connector";
import {ControllerDI} from "$src/modules";

export default class WebsocketConnector
    extends ModuleBaseConnector {
    config: WebsocketConfig | null = null;
    instance: ModuleBase | null = null;

    Connect(di: ControllerDI, config: ConfigInterface): void {
        this.instance = new WebsocketModule(di, <WebsocketConfig>config);
    }

    GetConfigType(): string {
        return "WebsocketConfig";
    }

    GetTitle(): string {
        return "Websocket";
    }

    GetInstance(): ModuleBase {
        return this.instance;
    }
}