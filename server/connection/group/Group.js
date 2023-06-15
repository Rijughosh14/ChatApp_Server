const connection=require('../../MainDb.js')
const instance=null

class dbgroup{
    static getdbserivceinstance(){
       return instance?instance: new dbgroup();
    }

    async createGroup(list,groupname,profile_pic){
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        try {
            const response=await new Promise((resolve,reject)=>{
                const query="insert into group_table (group_name,time,group_profile) values(?,?,?)"
                connection.query(query,[groupname,dateTime,profile_pic],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result)
                })
            })
            await new Promise((resolve,reject)=>{
                for(let x in list){
                     const query="insert into group_list(group_id,name_id,name) values(?,?,?)"
                connection.query(query,[response.insertId,list[x].id,list[x].name],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result)
                })
            }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    async sendGroupMsg(id,f_id,msg,img){
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        try {
          await new Promise((resolve,reject)=>{
                const query='update group_table set time=? where id=?;insert into group_message (group_id,sender_id,message,image) values (?,?,?,?) '
                connection.query(query,[dateTime,f_id,f_id,id,msg,img],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            
        } catch (error) { 
            console.log(error)
        }
    }

    async getGroupMsg(id){
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='select group_message.id,group_message.sender_id,group_message.message,group_message.image,signup_table.name from group_message JOIN signup_table on sender_id=signup_table.id where group_message.group_id =? ORDER BY group_message.id; '
                connection.query(query,[id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            return response     
        } catch (error) { 
            console.log(error)
        } 
    }
    async getGroupList(id){
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='SELECT group_list.id,group_list.name_id,group_list.name,signup_table.phone_number,signup_table.profile_pic FROM group_list JOIN signup_table on signup_table.id=group_list.name_id WHERE group_list.group_id=?;'
                connection.query(query,[id],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            return response     
        } catch (error) { 
            console.log(error)
        } 
    }
    async getGroup(id){
        try {
          const response= await new Promise((resolve,reject)=>{
                const query='SELECT group_id FROM `group_list` WHERE name_id=?;'
                connection.query(query,[id],(err,result)=>{
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

module.exports=dbgroup