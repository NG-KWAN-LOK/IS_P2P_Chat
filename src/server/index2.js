'use strict';
const { uuid } = require("uuidv4");
const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE,
  NEW_CHAT_USER,
} = require("../constants/Events");

var path = require("path");
var express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, '/../../build')));
const PORT = process.env.PORT || 3000;
app.set('port', PORT);
var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/../../build", "index.html"));
});
const io = (module.exports.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
}));

let connectedUsers = {};
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  //Verify Username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
      console.log(nickname + " is exist.");
    } else {
      callback({
        isUser: false,
        user: createUser(nickname, socket.id),
      });
      console.log(nickname + " " + socket.id + " is not exist");
    }
  });

  //User disconnects
  socket.on("disconnect", () => {
    Object.keys(connectedUsers).forEach((name) => {
      if (connectedUsers[name].socketId === socket.id) {
        delete connectedUsers[name];
      }
    });
    io.emit(USER_CONNECTED, connectedUsers);
    console.log("here we discounnected", connectedUsers);
  });

  //User Connects with username
  socket.on(USER_CONNECTED, (user) => {
    user.socketId = socket.id;
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    //sendMessageToChatFromUser = sendMessageToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  socket.on(PRIVATE_MESSAGE, ({ reciever, sender, message }, callback) => {
    console.log(reciever.socketId, sender.socketId, message);
    const newSendChat = { chatRoomUser: sender, sender, message, id: uuid() };
    const newChat = { chatRoomUser: reciever, sender, message, id: uuid() };
    callback(newChat);
    socket.to(reciever.socketId).emit(PRIVATE_MESSAGE, newSendChat);
  });

  function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
  }
  function createUser(nickname, socketId) {
    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    return {
      name: nickname,
      userId: uuid(),
      socketId: socketId,
      color: getRandomColor(),
    };
  }
  function isUser(userList, username) {
    return username in userList;
  }
});
