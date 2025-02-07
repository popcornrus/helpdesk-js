import {ConfigInterface} from "$core/module";

export interface HttpConfig extends ConfigInterface {
    BaseUrl: string;
    Token: string;
}