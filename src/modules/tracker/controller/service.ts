import {ModuleBaseController} from "$core/module/instance";
import {TrackerConfig} from "$trackerModule/types.ts";
import {ControllerDI} from "$src/modules";
import {eventWithTime, record} from "rrweb";
import {listenerHandler} from "@rrweb/types";
import Queue from "$core/queue.ts";
import HttpModule from "$httpModule/controller/module.ts";
import WebsocketModule from "$websocketModule/controller/module.ts";
import Tracker, {Channel} from "$trackerModule/controller/tracker.ts";

export default class TrackerController
    extends ModuleBaseController {

    readonly #http: HttpModule | null = null;
    readonly #websocket: WebsocketModule | null = null;
    readonly #config: TrackerConfig;
    readonly #queue: Queue<eventWithTime> = new Queue<eventWithTime>();

    #rrweb: listenerHandler | null = null;
    #tracker: Tracker = null;

    constructor(
        di: ControllerDI,
        config: TrackerConfig,
    ) {
        super();

        this.#config = config;
        this.#http = di.GetModule<HttpModule>("Http");
        this.#websocket = di.GetModule<WebsocketModule>("Websocket");
        this.#tracker = new Tracker(di);

        this.#startRecording();

        if (!this.#validateTrackerTimestamp()) {
            this.#delayCountDown().then(r => {
                this.#tracker.Create({
                    browser: <string>navigator.userAgent,
                    url: <string>window.location.href,
                    screen: {
                        width: <number>window.screen.width,
                        height: <number>window.screen.height
                    },
                    additional_info: config.additionalInfo,
                }, this.#queue.toArray());

                this.#queue.clear();
            });
        }
    }

    async #delayCountDown(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, this.#config.timeout));
    }

    #startRecording(): void {
        const _self = this;

        this.#rrweb = record({
            emit(event: eventWithTime) {
                if (_self.#tracker.GetChannel() === Channel.HTTP) {
                    _self.#queue.enqueue(event);
                    return;
                }

                if (!_self.#websocket.actions.GetAvailability()) {
                    _self.#queue.enqueue(event);
                } else {
                    if (_self.#queue.size() > 0) {
                        _self.#tracker.SendEventsUsingHttp(_self.#queue.toArray());
                        _self.#queue.clear();
                    }

                    _self.#tracker.SendEvent(event)
                }
            }
        });
    }

    #validateTrackerTimestamp(): boolean {
        const storageConfig = JSON.parse(localStorage.getItem("helpdesk") || "{}");

        if (!storageConfig.tracker) {
            return false;
        }

        if (Date.now() - storageConfig.tracker.timestamp > 1000 * 60 * 60) {
            localStorage.removeItem("helpdesk");
            return false;
        } else {
            localStorage.setItem("helpdesk", JSON.stringify({
                ...storageConfig,
                tracker: {
                    ...storageConfig.tracker,
                    timestamp: Date.now()
                }
            }));

            this.#tracker.SetUuid(storageConfig.tracker.uuid);
            this.#tracker.SetChannel(Channel.WEBSOCKET);
            return true;
        }
    }
}