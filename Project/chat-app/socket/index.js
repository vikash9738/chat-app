// Server Side (Node.js)
const { Server } = require("socket.io");
const http = require("http");
const { disconnect } = require("process");

const server = http.createServer();
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
let onlineUsers=[];

io.on("connection", (socket) => {
   console.log("Client connected:", socket.id);
   
   socket.on("disconnect", () => {
       console.log("Client disconnected:", socket.id);
   });

   // listen to connection
   socket.on("addNewUser",(userId)=>{
       !(onlineUsers.some((user)=>user.userId===userId))&&
          onlineUsers.push({
            userId,
            socketId: socket.id
          });
          console.log("online USer",onlineUsers);
          io.emit("getOnlineUsers",onlineUsers);
    })

    //add message
    socket.on("sendMessage",(message)=>{
        const user=onlineUsers.find(user=>user.userId===message.recipientId)
        if(user){
            io.to(user.socketId).emit("getMessage",message);
            io.to(user.socketId).emit("getNotification",{
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    })
    socket.on("disconnect",()=>{
        onlineUsers=onlineUsers.filter((user)=>{
            return user.socketId!==socket.id;
        })
        io.emit("getOnlineUsers",onlineUsers);
    })
});

server.listen(4567, () => {
    console.log("Socket.io server listening on port 4567");
});
