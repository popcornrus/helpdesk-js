import Compose from "$core/compose/instance";
import Modules from "$enums/modules";

import {HttpConfig} from "$httpModule/types";
import {WebsocketConfig} from "$websocketModule/types.ts";
import {HelpdeskJSConfigInterface} from "$core/types/helpdeskjs";
import {TrackerConfig} from "$trackerModule/types.ts";

const HelpdeskJSConfig = {
  Token: '6lM4bJh5YBwvKPKp8tpyGNtCwuClLKeZ5RMxFZDvuwV3bvhnSdKhSxshyi0voM1W',
  HttpEndpoint: 'http://localhost:3000/api/v1',
  WebsocketEndpoint: 'ws://localhost:3000/ws',

  Tracker: <TrackerConfig>{
    timeout: 1000,
    additionalInfo: {
      userId: '123'
    }
  }
}

interface ConfigInterface {
  Http: HttpConfig;
  Websocket: WebsocketConfig;
  Tracker?: TrackerConfig;
}


export default class HelpDeskJS {
  #compose: Compose = new Compose();

  constructor(
    configs: HelpdeskJSConfigInterface = HelpdeskJSConfig
  ) {
    const parsedConfig = this.#config(configs);

    this.#compose.Modules().Connect(Modules.Http, parsedConfig.Http);
    this.#compose.Modules().Connect(Modules.Websocket, parsedConfig.Websocket);

    if (parsedConfig.Tracker) {
      this.#compose.Modules().Connect(Modules.Tracker, parsedConfig.Tracker);
    }
  }

  #config(data: HelpdeskJSConfigInterface): ConfigInterface {
    let config = <ConfigInterface>{
      Http: <HttpConfig>{
        token: data.Token,
        endpoint: data.HttpEndpoint
      },
      Websocket: <WebsocketConfig>{
        token: data.Token,
        endpoint: data.WebsocketEndpoint
      },
    }

    if (data.Tracker) {
      config.Tracker = data.Tracker;
    }

    return config;
  }
}