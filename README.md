# Socket.IO CVE
A carefully crafted message sent from a connected client can throw an error on the server, causing denial of service

## Replication
- In the code below, the attack will commence as soon as soon as the [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance is intercepted
- One can run this repository, open the url it would be hosted in a browser and paste the code in to execute the attack
- You can wait for a probe from the server or initiate some interaction just to access the websocket to send the maliciously crafted text
- This works to at least `3.1.2` and it works because of unfortunately handled events from [socket.io](https://github.com/socketio/socket.io)
```js
//the code will go here (but in private for now)
```