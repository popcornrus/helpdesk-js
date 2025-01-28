import ApiChannel from './utils/api.js';
import WebsocketChannel from './utils/websocket.js';

import Tracker from './modules/tracker.js';

class Helpdesk {
	constructor({
    backend = {baseUrl: '', token: ''},
    websocket = {baseUrl: '', token: ''},
  }) {
		this.tracker = null;

		this.apiChannel = new ApiChannel(backend);
		this.websocketChannel = new WebsocketChannel(websocket);
	}

	async appendTrackerInstance() {
		this.tracker = new Tracker({
			api: this.apiChannel,
			ws: this.websocketChannel,
		});
	}
}

export default Helpdesk;