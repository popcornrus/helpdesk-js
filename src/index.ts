import Compose from "$src/compose";
import Modules from "$enums/modules";

import {HttpConfig} from "$httpModule/types";
import {WebsocketConfig} from "$websocketModule/types";

export default class HelpDeskJS {
    compose: Compose = new Compose();

    constructor() {
    }

    setHttp(config: HttpConfig) {
        this.compose.modules.Connect(Modules.Http, config);
    }

    setWebsocket(config: WebsocketConfig) {
        this.compose.modules.Connect(Modules.Http, config);
    }
}
