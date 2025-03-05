import {ConfigInterface} from "$core/module";

export interface HttpConfig extends ConfigInterface {
    endpoint: string;
    token: string;
}

const HttpTypeAssertion = (config: object): HttpConfig  => {
    if (config === null) {
        throw new Error(`Config is required`);
    }

    return config as HttpConfig;
}

export default HttpTypeAssertion;