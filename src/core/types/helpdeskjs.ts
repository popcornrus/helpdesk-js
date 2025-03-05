import {TrackerConfig} from "$trackerModule/types.ts";

export interface HelpdeskJSConfigInterface {
    Token: string;
    HttpEndpoint: string;
    WebsocketEndpoint: string;
    Tracker: TrackerConfig
}