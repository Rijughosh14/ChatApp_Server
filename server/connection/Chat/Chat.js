const connection=require('../../MainDb.js')
const instance=null

class dbChat{
    static getdbserviceinstance(){
        return instance?instance:new dbChat();
    }

    async sendMsg(id,f_id,msg,img){
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='select*from chat_table where f1_id=? And f2_id=? union select*from chat_table where f2_id=? and f1_id=? '
                connection.query(query,[id,f_id,id,f_id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            if(response.length==0){
                try {
                     await new Promise((resolve,reject)=>{
                          const query='insert into chat_table(f1_id,f2_id,time) values(?,?,?); insert into chatmessage_table(sender_id,receiver_id,chat,image) values(?,?,?,?)'
                          connection.query(query,[id,f_id,dateTime,id,f_id,msg,img],(err,result)=>{
                              if(err) reject(new Error(err.message));
                              resolve(result)
                          });
                      });
                      return
                      
                  } catch (error) { 
                      console.log(error)
                  }
            }

            else{
                try {
                    await new Promise((resolve,reject)=>{
                         const query='update chat_table set time=? where(f1_id=? and f2_id=?) or (f2_id=? and f1_id=?);insert into chatmessage_table(sender_id,receiver_id,chat,image) values(?,?,?,?)'
                         connection.query(query,[dateTime,id,f_id,id,f_id,id,f_id,msg,img],(err,result)=>{
                             if(err) reject(new Error(err.message));
                             resolve(result)
                         });
                     });
                     return
                     
                 } catch (error) { 
                     console.log(error)
                 }
            }
            
        } catch (error) { 
            console.log(error)
        }
    }
    async getMsg(id,f_id){
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='select*from chatmessage_table where sender_id=? And receiver_id=? union select*from chatmessage_table where receiver_id=? and sender_id=? ORDER BY id '
                connection.query(query,[id,f_id,id,f_id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            return response     
        } catch (error) { 
            console.log(error)
        }
    }
    async getChatcomponent(id){ 
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='select chat_table.id ,chat_table.f2_id as f_id,chat_table.time,signup_table.name,signup_table.profile_pic,signup_table.phone_number from chat_table join signup_table on chat_table.f2_id=signup_table.id where chat_table.f1_id=? union select chat_table.id ,chat_table.f1_id as f_id,chat_table.time,signup_table.name,signup_table.profile_pic,signup_table.phone_number from chat_table join signup_table on chat_table.f1_id=signup_table.id where chat_table.f2_id=? UNION SELECT 0,group_list.group_id,group_table.time,group_table.group_name,group_table.group_profile,null FROM group_list JOIN group_table on group_list.group_id=group_table.id WHERE group_list.name_id=? ORDER BY `time` DESC;'
                connection.query(query,[id,id,id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            return response     
        } catch (error) { 
            console.log(error)
        }
    }
}

module.exports=dbChat