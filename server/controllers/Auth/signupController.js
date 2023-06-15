const dbsignup=require('../../connection/Auth/signup')
const jwt=require('jsonwebtoken')

const signup_post=async(req,res)=>{
    const{Phone_number,Name,Profile_pic}=req.body
    const db=dbsignup.getdbserviceinstance();
    const result=await db.newUser(Phone_number,Name,Profile_pic)
    try {
    const accessToken=jwt.sign({id:result[0].id},process.env.SECRETKEY,{expiresIn:"15m"})
    return res.cookie(`userId`,accessToken).json(result)   
    } catch (error) { 
        console.log(error) 
    }   
}
const update_post=async(req,res)=>{
    const{Phone_number,Name,Profile_pic}=req.body
    const db=dbsignup.getdbserviceinstance();
    const result=await db.update(Phone_number,Name,Profile_pic)
    try {
    return res.send(result)   
    } catch (error) {
        console.log(error) 
    }   
}


module.exports={signup_post,update_post}