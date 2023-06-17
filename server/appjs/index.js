const express=require ('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const cookieParser=require('cookie-parser')
const route=require('../route/Auth/signupRoute.js')
const router=require('../route/Auth/loginRoute.js')
const logout_route=require('../route/Auth/logoutRoute.js');
const Profilerouter = require('../route/Profile/ProfileRoute.js');
const contact_Route = require('../route/contact/contactRoute.js');
const chatRoute = require('../route/Chat/chatRoute.js');
const grouproute=require('../route/Group/grouproute.js');
const multer = require('multer');
const { createServer } = require("http");
const{set_event,get_event,update_event}=require('../controllers/Events/Eventcontroller.js')
const { Server } = require("socket.io");

//cors  config
app.use(cors({origin:true,credentials:true}))

//setting socket user
const users=new Map();
const call=new Map();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      // origin: "http://localhost:3000",
      // or with an array of origins
       origin: [ "http://localhost:3000"],
      credentials: true
    }
  });

  //socket connection
io.on("connection", (socket) => {

  //setting user id 
  const {user}=socket.handshake.query
  users.set(user,socket.id)

  //on connection pending events
  
  // const response=get_event(user)
  // response.then((result)=>{
  //   if(result.length!==0){
  //     result.map((result)=>{
  //       socket.emit(`${result.event_name}`,JSON.parse(result.event_data))
  //     })
  //   }
  // })
  // .then(()=>{
  //   update_event(user)
  // })

  //refresh chat event
  socket.on('refresh_chat',()=>{ 
      socket.emit("received_refresh_chat");
  })

  //join group
  socket.on('groupdata',(data)=>{
    const{Data}=data
    Data.forEach((Data)=>{
      socket.join(Data.group_id)
    })
  })

  //sending message event
  socket.on('send_message',(data)=>{ 
    const recipientId =data.recipient_id; // the ID of the user you want to emit the event to
    const socketId = users.get(`${recipientId}`); 
    if (socketId) {
      io.to(socketId).emit("received_message",data); // emit the event to the receiver's socket
       io.to(socketId).emit("received_refresh_chat"); // emit the event to the receiver's refresh event
      //  io.to(socketId).emit("notification_message",data); // emit the event to the receiver's refresh event
    }
    else{
      // set_event(recipientId,data,"notification_message");
    }
  })

  //send Group_message
  socket.on('send_Groupmessage',(data)=>{
    const{RoomId}=data
    // const room = io.sockets.adapter.rooms.get(RoomId);
     socket.broadcast.to(RoomId).emit('received_Groupmessage',data)
     socket.broadcast.to(RoomId).emit('received_refresh_chat')
    //  socket.broadcast.to(RoomId).emit('group_notification_message',data)
  })

  //leaving group room
  socket.on('leave_room',(data)=>{  
    const{Data}=data
    Data.forEach((Data)=>{
      socket.leave(Data.group_id)
    })
  })
  
//video call made event
try {
  socket.on('video-call-made',(data)=>{
    const{callee,caller}=data
    const socketId = users.get(`${callee}`);
    const ID=call.get(`${callee}`) 
    if(ID){
      socket.emit('busy')
    }
    else if(socketId){
      io.to(socketId).emit('video-call-incoming',data);
      call.set(callee,socketId)
      call.set(caller,socket.id)
    }
    else{
      socket.emit('receiver_offline');
    }
  })
  
} catch (error) {
  console.log(error)
}
// call made event
try {
  socket.on('call-made',(data)=>{
    const{callee,caller}=data
    const socketId = users.get(`${callee}`); 
    const ID=call.get(`${callee}`);

    if(ID){
      socket.emit('busy')
    }
    else if(socketId){
      io.to(socketId).emit('call-incoming',data);
      call.set(callee,socketId)
      call.set(caller,socket.id)
    }
    else{
      socket.emit('receiver_offline');
      call.set(caller,socket.id)
    }
  })
  
} catch (error) {
  console.log(error)
}

// signaling data exchange
socket.on('signal',(data)=>{
  const {callee}=data
  const socketId = users.get(`${callee}`); 
  if(socketId){
    io.to(socketId).emit('signal',data);
  }
  else{
    socket.emit('offline');
  }
})

//call disconnect
socket.on('close',(data)=>{
  const {callee,caller}=data
  const socketId = users.get(`${callee}`); 
  if(socketId){
    io.to(socketId).emit('close');
  }
  call.delete(callee)
  call.delete(caller)
})
});



//express json
app.use(express.json())

//cookie parser
app.use(cookieParser())

//urlencoded
 app.use(express.urlencoded({extended:false}));

//images
 app.use('/uploads',express.static("server/appjs/uploads"),(req,res)=>{
    res.status(200)
 });   

//uploads 
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'server/appjs/uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({storage})
app.post('/user/upload',upload.single('file'),(req,res)=>{ 
    const file=req.file?req.file:""
res.status(200).json(file?file.filename:" ")
})

//signup
app.use('/user',route)

//login
app.use('/user',router)

//logout
app.use('/user',logout_route)

//Profile
app.use('/user',Profilerouter)

//add contact
app.use('/user',contact_Route)

//chat
app.use('/user',chatRoute)

//group 
app.use('/user',grouproute)

//port listener
httpServer.listen(process.env.PORT)
