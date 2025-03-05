import {ModuleConnectorInterface} from "$core/module";
import HttpConnector from "$httpModule/connector";
import WebsocketConnector from "$websocketModule/connector.ts";
import TrackerConnector from "$trackerModule/connector.ts";

const Modules: Record<string, ModuleConnectorInterface> = {
    Http: new HttpConnector(),
    Websocket: new WebsocketConnector(),
    Tracker: new TrackerConnector(),
}

export default Modules;
