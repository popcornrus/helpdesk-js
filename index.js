import ApiChannel from './utils/api.js';
import WebsocketChannel from './utils/websocket.js';

import Tracker from './modules/tracker.js';

class Helpdesk {
	constructor({
		            backend = {baseUrl: '', token: ''},
		            websocket = {baseUrl: '', token: ''},
		            module: {
			            tracker = false,
		            }
	            }) {
		this.apiChannel = null;
		this.websocketChannel = null;

		this.connect({
      api: backend,
      websocket: websocket,
    } ).then(r => {
      this.integrateModules(module)
    })
	}

	async connect({
		              api: {
			              baseUrl: backendUrl,
			              token: apiToken
		              },
		              websocket: {
			              baseUrl: websocketUrl,
			              token: wsToken
		              },
	              }) {
		this.apiChannel = new ApiChannel({
			baseUrl: backendUrl,
			token: apiToken,
		});

		this.websocketChannel = new WebsocketChannel({
			baseUrl: websocketUrl,
      token: wsToken,
		});
	}

  async integrateModules({
                  tracker = false,
                }) {
    if (tracker) {
      this.tracker = new Tracker({
        api: this.apiChannel,
        ws: this.websocketChannel,
      });
    }
  }
}

export default Helpdesk;