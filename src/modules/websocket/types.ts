import {ConfigInterface} from "$core/module";

export interface WebsocketConfig extends ConfigInterface {
    url: string;
    Token: string;
}