const Express=require('express')
const grouproute=Express.Router();
const {create_group,send_GroupMessage,get_GroupMessage,get_GroupList,get_Group}=require('../../controllers/Group/groupcontroller.js')

grouproute.post('/newGroup',create_group)
grouproute.post('/groupmessage',send_GroupMessage)
grouproute.get('/groupchat',get_GroupMessage)
grouproute.get('/grouplist',get_GroupList)
grouproute.get('/group',get_Group)

module.exports=grouproute