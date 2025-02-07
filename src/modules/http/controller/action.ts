import {ModuleControllerInterface} from "$core/module/instance/interface";

export default class HttpController
    implements ModuleControllerInterface {

    #token: string;
    #baseUrl: string;

    constructor(
        baseUrl: string,
        token: string,
    ) {
        this.#token = token;
        this.#baseUrl = baseUrl;

        this.#validateToken();
    }

    #validateToken() {
        if (!this.#token) {
            throw new Error("Token is required");
        }

        fetch(`${this.#baseUrl}/validate`, {
            headers: {
                Authorization: `Bearer ${this.#token}`,
            },
            method: "POST",
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error("Invalid token");
            }
        })
    }
}