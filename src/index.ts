import Compose from "$src/compose";
import Modules from "$enums/modules";

import {HttpConfig} from "$httpModule/types";
import {ConfigInterface} from "$core/module";

export default class HelpDeskJS {
    compose: Compose = new Compose();

    constructor(
        httpConfig: ConfigInterface,
        websocketConfig: ConfigInterface,
    ) {
        this.#setHttp(httpConfig as HttpConfig);
        this.#setWebsocket(websocketConfig as HttpConfig);
    }

    #setHttp(config: HttpConfig) {
        this.compose.modules.Connect(Modules.Http, config);
    }

    #setWebsocket(config: HttpConfig) {
        this.compose.modules.Connect(Modules.Websocket, config);
    }
}
