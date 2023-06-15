const Express=require('express')
const logout_route=Express.Router()
const {logout_post}=require('../../controllers/Auth/logoutController.js')

logout_route.post('/logout',logout_post) //logout user

module.exports=logout_route