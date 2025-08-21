require("dotenv").config();
const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: process.env.SOC_URL,
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection: ", socket.id);

  socket.on("addNewUser", (userId) => {
    // Check if userId is already in the list
    const isUserAlreadyOnline = onlineUsers.some(
      (user) => user.userId === userId
    );

    if (!isUserAlreadyOnline) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }

    console.log("OnlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage" , (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipentId);

    if(user){
      io.to(user.socketId).emit("getMessage", message);
    }
  })

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
