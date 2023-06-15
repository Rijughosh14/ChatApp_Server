const Express=require('express');
const Profilerouter=Express.Router();
const {userProfile}=require('../../controllers/Profile/ProfileController.js')


Profilerouter.get('/profile',userProfile)

module.exports=Profilerouter;