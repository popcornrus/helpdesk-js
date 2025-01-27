class Tracker {
    accessible = false;
    eventQueue = []; // Queue to store events

    constructor({
                    apiChannel = null,
                    wsChannel = null
                }) {
        this.api = apiChannel;
        this.ws = wsChannel;
    }

    async connectRRWeb() {
        const { record } = await import('rrweb');
        this.record = record;
    }

    async start() {
        await this.createTracker();
        const _self = this;

        await this.connectRRWeb();
        this.record({
            emit(event) {
                _self._trackerWebSocket(event);
            }
        });
    }

    async createTracker() {
        this.api.post(`/trackers/create`, {
            browser: navigator.userAgent,
            screen: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            },
            url: window.location.href,
            additional_info: []
        }).then(({ data }) => {
            this.trackUuid = data.data.uuid;
            this.accessible = true;

            // Flush the queue once accessible is true
            this._flushQueue();
        });
    }

    async _trackerWebSocket(data) {
        if (!this.accessible) {
            // If not accessible, add the event to the queue
            this.eventQueue.push(data);
            return;
        }

        // If accessible, send the event directly
        this.ws.send(JSON.stringify({
            channel: `tracking.${this.trackUuid}`,
            event: 'update',
            data: data
        }));
    }

    _flushQueue() {
        // Send all queued events once accessible is true
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift(); // Remove the first event from the queue
            this._trackerWebSocket(event); // Send the event
        }
    }
}

export default Tracker;
