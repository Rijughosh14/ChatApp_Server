const dblogin = require("../../connection/Auth/login.js")
const jwt=require('jsonwebtoken')
// const Cookieset=require('../../component/cookie.js')

const login_post=async(req,res)=>{
    const {Phone_number}=req.body
    const db=dblogin.getdbinstance();
    const result=await db.login(Phone_number);
    try {
        if(result.lenght!=0){
        const accessToken=jwt.sign({id:result[0].id},process.env.SECRETKEY,{expiresIn:"30m"})
         return res.cookie(`userId`,accessToken).json(result)
        }
       
    } catch (error) {
        console.log(error)
    }
    
}


const userExistence=async(req,res)=>{
    const userPhone=req.query.userPhone
    const db=dblogin.getdbinstance();
    const result=await db.userExistence(userPhone);
    if (result.length!=0)
    {
    res.send({exist:true})
    }
    else
    { 
    res.send({exist:false})
    }
}

module.exports={login_post,userExistence}