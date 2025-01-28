class WebsocketChannel {
	constructor({
		            baseUrl = '',
								token = ''
	            }) {
		if (!baseUrl) {
			throw new Error('WebsocketChannel: baseUrl is required');
		}

		if (!token) {
			throw new Error('WebsocketChannel: token is required');
		}

		this.socket = new WebSocket(`${baseUrl}?token=${token}`);
		this.socket.onopen = () => {
			console.log('connected');
		};
		this.socket.onerror = (event) => {
			console.log('message', event.data);
		};
	}

	send(data) {
		this.socket.send(data);
	}
}

export default WebsocketChannel;