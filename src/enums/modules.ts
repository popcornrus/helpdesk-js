import {ModuleConnectorInterface} from "$core/module";
import HttpConnector from "$httpModule/connector";
import WebsocketConnector from "$src/modules/websocket/connector.ts";

const Modules: { [key: string]: ModuleConnectorInterface } = {
    Http: new HttpConnector(),
    Websocket: new WebsocketConnector()
};

export default Modules;
