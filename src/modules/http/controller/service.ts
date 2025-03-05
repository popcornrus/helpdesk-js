import {ModuleBaseController} from "$core/module/instance";
import {HttpConfig} from "$httpModule/types.ts";
import {ControllerDI} from "$src/modules";

export default class HttpController
    extends ModuleBaseController {

    readonly #di: ControllerDI;
    readonly #config: HttpConfig;

    #isAvailable: boolean = false;

    constructor(
        di: ControllerDI,
        config: HttpConfig,
    ) {
        super();

        if (!config.endpoint) {
            throw new Error("URL is required");
        }

        if (!config.token) {
            throw new Error("Token is required");
        }

        this.#config = config;
        this.#di = di;

        this.validateToken(this.#config.token).then(r => {
            console.log(r)
        })
    }

    validateToken(token: string): Promise<Response> {
        return fetch(`${this.#config.endpoint}/projects/validate/${token}`, {}).catch(() => {
            throw new Error("Token is invalid");
        });
    }

    async Post(endpoint: string, data: object): Promise<object> {
        return await fetch(`${this.#config.endpoint}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Project-Token": `${this.#config.token}`
            },
            body: JSON.stringify(data)
        }).then(async (r) => {
            return await r.json();
        });
    }
}