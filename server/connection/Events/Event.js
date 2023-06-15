const connection=require('../../MainDb.js')
const instance=null

class dbEvent{
    static getdbserviceinstance(){
        return instance?instance:new dbEvent();
    }

    async setevent(recipientId,event_data,event_name){
        try {
            await new Promise((resolve,reject)=>{
                const query='insert into pending_events(recipient_id,event_data,event_name) values(?,?,?)'
                connection.query(query,[recipientId,event_data,event_name],(err,result)=>{
                    if(err) reject( new Error(err.message));
                    resolve(result)
                });
            });
            
        } catch (error) {
            console.log(error)
        }
    }

    async getevent(user){
        try {
            const result=await new Promise((resolve,reject)=>{
                const query='select event_data,event_name from pending_events where recipient_id=? and delivered =0'
                connection.query(query,[user],(err,result)=>{
                    if(err) reject( new Error(err.message));
                    resolve(result)
                });
            });
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateEvent(user){
        try {
            const result=await new Promise((resolve,reject)=>{
                const query='delete from pending_events where recipient_id=?'
                connection.query(query,[user],(err,result)=>{
                    if(err) reject( new Error(err.message));
                    resolve(result)
                });
            });
            return result
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=dbEvent