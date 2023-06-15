const dbEvent=require('../../connection/Events/Event.js')

const set_event=async(recipientId,data,event_name)=>{
    const event_data=JSON.stringify(data)
    try {     
    const db=dbEvent.getdbserviceinstance()
    const result= await db.setevent(recipientId,event_data,event_name)
    return result
        
    } catch (error) {
        console.log(error)
    }
}
const get_event=async(user)=>{
    try {     
    const db=dbEvent.getdbserviceinstance()
    const result= await db.getevent(user)
    return result
        
    } catch (error) {
        console.log(error)
    }
}
const update_event=async(user)=>{
    try {     
    const db=dbEvent.getdbserviceinstance()
    const result= await db.updateEvent(user)
    return result
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={set_event,get_event,update_event}