/*
This is my socket.io chat implementation
*/

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", (socket) => {
  console.log("someone connected");
  io.emit("user joined");
  socket.on("disconnect", () => {
    console.log("someone disconnected");
    io.emit("user left");
    socket.disconnect()
  });
  socket.on("chat message", (data) => {
    if (data.chatmsg.startsWith("/")) {
      cmd = data.chatmsg;
      cmd = cmd.substring(1);
      processCommand(cmd, socket);
    } else {
      msg = data.username + ": " + data.chatmsg;
      io.emit("chat message", msg);
    }
  });
});

function processCommand(command, socket) {
  switch (command) {
    case "":
      socket.emit("chat message", "You gotta tell me a command");
      break;
    case "help":
      socket.emit("chat message", "/help");
      socket.emit("chat message", "/me");
      socket.emit("chat message", "/");
      break;
    case "me":
      socket.emit("chat message", "In development");
      break;
    case "say":
      io.emit("chat message", "/say is in development, try /help for all the commands btw");
  }
}

app.use("/client", express.static(__dirname + "/client"));

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});