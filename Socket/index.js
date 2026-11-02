const io =require("socket.io")(8800,{
    cors:{
        origin:"http://localhost:3001"
    }
})

let activeUsers=[]
  
// New Connection
io.on("connection",(socket)=>{
 
    // Adds New User
    socket.on('new-user-add',(newUserId)=>{
        if (!newUserId || newUserId!=undefined) {
            if(!activeUsers.some((user)=>user.userId===newUserId)){
                activeUsers.push({
                    userId:newUserId,
                    socketId:socket.id
                })
            }
        }
        console.log("Connected users",activeUsers);
        io.emit('get-users',activeUsers)
    })

    // User Disconnected
    socket.on("disconnect",()=>{
        activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id);
        console.log("User Disconnected "+socket.id);
        io.emit('get-users',activeUsers);
    })


    //Send Message
    socket.on("send-message",(data)=>{
        const {reciverId}=data;
        const user =activeUsers.find((user)=> user.userId==reciverId)
        if(user){
              io.to(user.socketId).emit("recive-message",data)
        }
    })
     
    // Set Typing Status
    socket.on("set-typing",(data)=>{
        const user =activeUsers.find((user)=> user.userId==data.userId);
        console.log("this is the reciver",user);
         console.log("this are the active users",activeUsers);
        if(user && user.socketId!==socket.id){
            io.to(user.socketId).emit("set-typing-status",data.status)
      }
    })
})