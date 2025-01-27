import ApiChannel from './utils/api';
import WebsocketChannel from './utils/websocket';
import Tracker from './modules/tracker';

class Helpdesk {
    constructor({
                    backendUrl = 'http://localhost:3000',
                    websocketUrl = 'ws://localhost:3000',
                    apiToken = '1234567890'
                }) {
        this.apiChannel = null;
        this.websocketChannel = null;

        this.backendUrl = backendUrl;
        this.websocketUrl = websocketUrl;
        this.apiToken = apiToken;

        this.tracker = null;
    }

    async connect({
                      tracker = false
                  }) {
        this.apiChannel = new ApiChannel({
            baseUrl: this.backendUrl,
            token: this.apiToken
        });

        this.websocketChannel = new WebsocketChannel({
            url: this.websocketUrl,
        });

        if (tracker) {
            this.tracker = new Tracker({
                apiChannel: this.apiChannel,
                wsChannel: this.websocketChannel
            });
        }
    }
}

export default Helpdesk;