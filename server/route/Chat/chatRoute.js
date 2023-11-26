const Express=require('express')
const chatRoute=Express.Router();
const{send_message,get_message,get_chatComponent,get_Lastmessage}=require('../../controllers/Chat/chatController.js')

chatRoute.post('/message',send_message)
chatRoute.get('/chat',get_message)
chatRoute.get('/lastchat',get_Lastmessage)
chatRoute.get('/chatComponent',get_chatComponent)

module.exports=chatRoute