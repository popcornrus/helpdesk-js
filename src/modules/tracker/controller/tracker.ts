import {ControllerDI} from "$src/modules";
import HttpModule from "$httpModule/controller/module.ts";
import {eventWithTime} from "rrweb";
import WebsocketModule from "$websocketModule/controller/module.ts";

export enum Channel {
    HTTP = "HTTP",
    WEBSOCKET = "WEBSOCKET"
}

export default class Tracker {
    #http: HttpModule | null = null;
    #websocket: WebsocketModule | null = null;

    #uuid: string = "";

    #channel: Channel = Channel.HTTP;

    constructor(di: ControllerDI) {
        this.#http = di.GetModule<HttpModule>("Http");
        this.#websocket = di.GetModule<WebsocketModule>("Websocket");
    }

    Create(data: object, queue: eventWithTime[]) {
        this.#http.actions.Post(`trackers/create`, data).then(r => {
            // @ts-ignore
            this.#uuid = r?.data.uuid;
            this.SendEvent(queue);

            localStorage.setItem("helpdesk", JSON.stringify({
                ...JSON.parse(localStorage.getItem("helpdesk") || "{}"),
                tracker: {
                    uuid: this.#uuid,
                    timestamp: Date.now()
                }
            }));

            this.#channel = Channel.WEBSOCKET;
        }).catch(e => {
            console.error(e);
        });
    }

    SendEvent(data: any) {
        if (this.#channel === Channel.HTTP) {
            this.SendEventsUsingHttp(data);
        } else {
            this.#websocket.actions.Send(
              `tracking.${this.#uuid}`,
              `update`,
              data
            )
        }
    }

    GetChannel(): Channel {
        return this.#channel;
    }

    SetChannel(channel: Channel) {
        this.#channel = channel;
    }

    GetUuid(): string {
        return this.#uuid;
    }

    SetUuid(uuid: string) {
        this.#uuid = uuid;
    }

    SendEventsUsingHttp(queue: eventWithTime[]) {
        this.#http.actions.Post(`trackers/${this.#uuid}/events`, {data: queue}).then(r => {
            console.log(r);
        }).catch(e => {
            console.error(e);
        });
    }
}