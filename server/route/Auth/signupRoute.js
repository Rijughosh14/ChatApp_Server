const Express=require('express');
const route=Express.Router();
const{signup_post,update_post}=require('../../controllers/Auth/signupController.js')

route.post('/signup',signup_post);//new user
route.post('/update',update_post);//update user

module.exports=route;