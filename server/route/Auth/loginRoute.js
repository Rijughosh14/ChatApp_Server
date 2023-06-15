const Express=require('express');
const router=Express.Router();
const {login_post,userExistence}=require('../../controllers/Auth/loginController.js')


router.post('/login',login_post) 
router.get('/checkUserExist',userExistence)

module.exports=router;