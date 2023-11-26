const Express=require('express');
const router=Express.Router();
const {login_post,userExistence,userCookie}=require('../../controllers/Auth/loginController.js')


router.post('/login',login_post) 
router.get('/checkUserExist',userExistence)
router.get('/cookies',userCookie)

module.exports=router;