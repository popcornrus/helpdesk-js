class Tracker {
    #accessible = {
        apiReady: false,
        wsReady: false,
        startDelayComplete: false,
    };
    #eventQueue = []; // Queue to store events
    #trackUuid = null;
    #record = null;

    constructor({ api = null, ws = null }) {
        this.api = api;
        this.ws = ws;
    }

    /**
     * Dynamically imports the 'rrweb' library and initializes the record function.
     */
    async connectRRWeb() {
        try {
            const { record } = await import('rrweb');
            this.#record = record;
        } catch (error) {
            console.error('Failed to load rrweb:', error);
        }
    }

    /**
     * Starts the tracker by creating the tracker, connecting to rrweb, and setting up the recording.
     */
    async start() {
        try {
            await this.connectRRWeb();

            this.#record?.({
                emit: this.#trackerWebSocket.bind(this)
            });
            setTimeout(async () => {
                this.#accessible.startDelayComplete = true;
                await this.createTracker();
                this.#flushQueue();
            }, 5000);
        } catch (error) {
            console.error('Failed to start tracker:', error);
        }
    }

    /**
     * Creates a tracker via the API and initializes the tracking UUID.
     */
    async createTracker() {
        try {
            const response = await this.api.post(`/trackers/create`, {
                browser: navigator.userAgent,
                screen: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                },
                url: window.location.href,
                additional_info: []
            });
            this.#trackUuid = response.data.data.uuid;
            this.#accessible.apiReady = true;
            this.#flushQueue();
        } catch (error) {
            console.error('Failed to create tracker:', error);
        }
    }

    /**
     * Sends tracking data via WebSocket or queues it if conditions are not met.
     * @param {Object} data - The event data to be tracked.
     */
    async #trackerWebSocket(data) {
        if (!this.#accessible.apiReady || !this.#accessible.wsReady || !this.#accessible.startDelayComplete) {
            this.#eventQueue.push(data);
            return;
        }

        try {
            this.ws.send(JSON.stringify({
                channel: `tracking.${this.#trackUuid}`,
                event: 'update',
                data: data
            }));
        } catch (error) {
            console.error('Failed to send WebSocket message:', error);
        }
    }

    /**
     * Flushes the event queue by sending all queued events.
     */
    #flushQueue() {
        while (this.#eventQueue.length > 0) {
            const event = this.#eventQueue.shift();
            this.#trackerWebSocket(event);
        }
    }
}

export default Tracker;