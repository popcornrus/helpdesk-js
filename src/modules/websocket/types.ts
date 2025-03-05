import {ConfigInterface} from "$core/module";

export interface WebsocketConfig extends ConfigInterface {
    endpoint: string;
    token: string;
}