const Express=require('express')
const contact_Route=Express.Router();
const {contact_post,get_friend_request,handle_friend_request,get_friend,userExistence}=require('../../controllers/contact/contactController.js')

contact_Route.post('/addcontact',contact_post)
contact_Route.get('/request',get_friend_request)
contact_Route.get('/friends',get_friend)
contact_Route.post('/handlerequest',handle_friend_request)
contact_Route.get('/checkuser',userExistence)

module.exports=contact_Route