class Tracker {
    #accessible = {
        apiReady: false,
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
            const { data } = await this.api.post(`/trackers/create`, {
                browser: navigator.userAgent,
                screen: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                },
                url: window.location.href,
                additional_info: []
            });

            this.#trackUuid = data.data.uuid;
            this.#accessible.apiReady = true;
            this.#trackerBatchEventsApi();

        } catch (error) {
            console.error('Failed to create tracker:', error);
        }
    }

    /**
     * Sends tracking data via WebSocket or queues it if conditions are not met.
     * @param {Object} data - The event data to be tracked.
     */
    async #trackerWebSocket(data) {
        if (!this.#accessible.apiReady || !this.#accessible.startDelayComplete) {
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
    
    async #trackerBatchEventsApi() {
        if (!this.#accessible.startDelayComplete) {
            return;
        }

        try {
            this.api.post(`/trackers/${this.#trackUuid}/events`, {
                data: this.#eventQueue
            });
            
            this.#eventQueue = [];
        } catch (error) {
            console.error('Failed to send API message:', error);
        }
    }
}

export default Tracker;