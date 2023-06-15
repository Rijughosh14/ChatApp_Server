const dbgroup=require('../../connection/group/Group.js')

const create_group=async(req,res)=>{
    try {
     const {list,groupname,profile_pic}=req.body
    const db=dbgroup.getdbserivceinstance()
    await db.createGroup(list,groupname,profile_pic)
   res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

const send_GroupMessage=async(req,res)=>{
    try {
        const {id,f_id,msg,img}=req.body
        const db=dbgroup.getdbserivceinstance()
        await db.sendGroupMsg(id,f_id,msg,img)  
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
const get_GroupMessage=async(req,res)=>{
    try {
        const id=req.query.id
        const db=dbgroup.getdbserivceinstance()
        const result=await db.getGroupMsg(id)
        res.send(result)  
    } catch (error) {
        console.log(error)
    }
}
const get_GroupList=async(req,res)=>{
    try {
        const id=req.query.id
        const db=dbgroup.getdbserivceinstance()
        const result=await db.getGroupList(id)
        res.send(result)  
    } catch (error) {
        console.log(error)
    }
}
const get_Group=async(req,res)=>{
    try {
        const id=req.query.id
        const db=dbgroup.getdbserivceinstance()
        const result=await db.getGroup(id)
        res.send(result)  
    } catch (error) {
        console.log(error)
    }
}

module.exports={create_group,send_GroupMessage,get_GroupMessage,get_GroupList,get_Group}