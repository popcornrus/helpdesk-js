import {ModuleControllerInterface} from "$core/module/instance/interface";
import Compose from "$src/compose.ts";
import HttpController from "$httpModule/controller/action.ts";

export default class WebsocketController
    extends Compose
    implements ModuleControllerInterface {
    readonly #token: string;
    readonly #url: string;

    #httpModule: HttpController | null = null;
    #websocket: WebSocket | null = null;

    constructor(
        url: string,
        token: string,
    ) {
        super();

        if (!url) {
            throw new Error("Base URL is required");
        }

        if (!token) {
            throw new Error("Token is required");
        }

        this.#token = token;
        this.#url = url;

        this.#connectHttpController();
        this.#connectToWebsocket();

        this.#httpModule.validateToken("websocket").then(r => {
            throw new Error("Token is invalid");
        });
    }

    get Websocket(): WebSocket | null {
        return this.#websocket;
    }

    #connectToWebsocket(): void {
        console.log("Connecting to websocket");
        this.#websocket = new WebSocket(this.#url);
        new WebsocketEvents(this.#websocket);
    }

    #connectHttpController(): void {
        if (super.Modules.Exists("Http")) {
            this.#httpModule = super.Modules.Get("Http") as unknown as HttpController;
        }
    }
}

class WebsocketEvents {
    #websocket: WebSocket | null = null;

    constructor(
        ws: WebSocket
    ) {
        this.#websocket = ws;
        this.#connectEvents();
    }

    #connectEvents(): void {
        this.#onOpen();
        this.#onClose();
        this.#onError();
        this.#onMessage();
    }

    #onOpen(): void {
        this.#websocket.onopen = function (event) {
            console.log("Connection opened");
        };
    }

    #onClose(): void {
        this.#websocket.onclose = function (event) {
            console.log("Connection closed");
        };
    }

    #onError(): void {
        this.#websocket.onerror = function (event) {
            console.log("Error occurred");
        };
    }

    #onMessage(): void {
        this.#websocket.onmessage = function (event) {
            console.log("Message received");
        };
    }
}