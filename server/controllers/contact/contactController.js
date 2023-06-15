const dbcontact=require('../../connection/Add_contact/contact.js')
const dblogin=require('../../connection/Auth/login.js')

const contact_post=async(req,res)=>{
    const {data,id}=req.body;
    const db=dbcontact.getdbserviceinstance();
    const result=await db.addContact(data,id)
    try {
        res.send(result)
        
    } catch (error) {
        console.log(error)
    }
}

const userExistence=async(req,res)=>{
    const userPhone=req.query.userPhone
    const db=dblogin.getdbinstance();
    const result=await db.userExistence(userPhone);
    try {
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}


const get_friend_request=async(req,res)=>{
    const id=req.query.id;
    const db=dbcontact.getdbserviceinstance();
    const result=await db.friendRequest(id)
    try {
        res.send(result)
        
    } catch (error) {
        console.log(error)
    }

}
const get_friend=async(req,res)=>{
    const id=req.query.id;
    const db=dbcontact.getdbserviceinstance();
    const result=await db.friendList(id)
    try {
        res.send(result)
        
    } catch (error) {
        console.log(error)
    }

}
const handle_friend_request=async(req,res)=>{
    const {id,handle}=req.body;
    const db=dbcontact.getdbserviceinstance();
    const result=await db.handlefriendRequest(id,handle)
    try {
        res.send(result)
        
    } catch (error) {
        console.log(error)
    }

}
module.exports={contact_post,get_friend_request,handle_friend_request,get_friend,userExistence}