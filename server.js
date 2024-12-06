const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatBot";

io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("joinRoom", ({ username, room }) => {
    socket.emit("message", formatMessage(botName, "Welcome to Chat!"));

    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user have joining to the chat!")
    );
  });

  //Listen for chat messages;

  socket.on("chatmessage", (mzg) => {
    console.log(mzg);
    io.emit("chatmessage", formatMessage("User", "dddd"));
  });

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
