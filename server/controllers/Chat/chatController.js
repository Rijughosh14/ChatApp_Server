const dbChat=require('../../connection/Chat/Chat.js')

const send_message=async(req,res)=>{
    try {
        const{id,f_id,msg,img}=req.body
        const db=dbChat.getdbserviceinstance()
        await db.sendMsg(id,f_id,msg,img)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
const get_message=async(req,res)=>{
    try {
        const{id,f_id}=req.query
        const db=dbChat.getdbserviceinstance()
        const result=await db.getMsg(id,f_id)
        res.send(result) 
    } catch (error) {
        console.log(error)
    }
}
const get_chatComponent=async(req,res)=>{
    try {
        const{id}=req.query
        const db=dbChat.getdbserviceinstance()
        const result=await db.getChatcomponent(id)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports={send_message,get_message,get_chatComponent}