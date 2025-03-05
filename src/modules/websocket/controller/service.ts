import {ModuleBaseController} from "$core/module/instance";
import {WebsocketConfig} from "$websocketModule/types.ts";
import HttpModule from "$httpModule/controller/module.ts";
import {ControllerDI} from "$src/modules";

export default class WebsocketController
    extends ModuleBaseController {
    readonly #di: ControllerDI;
    readonly #config: WebsocketConfig;
    #isAvailable: boolean = false;

    #websocket: WebSocket | null = null;

    constructor(
        di: ControllerDI,
        config: WebsocketConfig,
    ) {
        super();

        this.#config = config;
        this.#di = di;

        this.#connectWebsocketInstance();
    }

    get Websocket(): WebSocket | null {
        return this.#websocket;
    }

    Send(
      channel: string,
      event: string,
      data: object
    ): void {
        this.#websocket.send(JSON.stringify({
            channel,
            event,
            data
        }));
    }

    GetAvailability(): boolean {
        return this.#isAvailable;
    }

    SetAvailability(value: boolean) {
        this.#isAvailable = value;
    }

    #connectWebsocketInstance(): void {
        this.#websocket = new WebSocket(`${this.#config.endpoint}?token=${this.#config.token}`);

        this.#websocket.addEventListener("open", () => {
            this.SetAvailability(true);
        })
    }
}