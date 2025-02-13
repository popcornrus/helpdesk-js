import {ModuleControllerInterface} from "$core/module/instance/interface";

export default class HttpController
    implements ModuleControllerInterface {

    #token: string;
    #url: string;

    constructor(
        url: string,
        token: string,
    ) {
        if (!url) {
            throw new Error("Base URL is required");
        }

        if (!token) {
            throw new Error("Token is required");
        }

        this.#token = token;
        this.#url = url;

        this.validateToken("http").then(r => {
            throw new Error("Token is invalid");
        });
    }

    async validateToken(type: string): Promise<any> {
        if (!this.#token) {
            throw new Error("Token is required");
        }

        await fetch(`${this.#url}/validate/${type}`, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
            },
            method: "POST",
        }).then((response) => {
            return response
        })
    }
}