class WebsocketChannel {
	constructor({
								url = 'ws://localhost:3000',
							}) {
		this.socket = new WebSocket(`${url}`);
		this.socket.onopen = () => {
			console.log('connected');
		};
		this.socket.onmessage = (event) => {
			console.log('message', event.data);
		};
	}

	send(data) {
		this.socket.send(data);
	}
}

export default WebsocketChannel;