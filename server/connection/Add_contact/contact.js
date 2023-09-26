const connection=require('../../MainDb.js')
let instance=null;

class dbcontact{
    static getdbserviceinstance(){
        return instance?instance:new dbcontact();
    }

    async addContact(data,id){

        try 
        {
          const response=await new Promise((resolve,reject)=>{
                const query="SELECT friend_list.F_id from friend_list JOIN signup_table on signup_table.id=friend_list.F_id where signup_table.phone_number=? AND friend_list.U_id=? UNION SELECT friend_list.U_id from friend_list JOIN signup_table on signup_table.id=friend_list.U_id where signup_table.phone_number=? AND friend_list.F_id=?;"
                connection.query(query,[data,id,data,id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            if(response.length!==0) return("Already in ur friend list")
            
        } 
        catch (error)
         {
            console.log(error)
        }

        try 
        {
          const response=await new Promise((resolve,reject)=>{
                const query="SELECT friend_request.f_id from friend_request JOIN signup_table on signup_table.id=friend_request.f_id where signup_table.phone_number=? AND friend_request.u_id=? UNION SELECT friend_request.u_id from friend_request JOIN signup_table on signup_table.id=friend_request.u_id where signup_table.phone_number=? AND friend_request.f_id=?;"
                connection.query(query,[data,id,data,id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            if(response.length!==0) return("Request already present")
            
        } 
        catch (error)
         {
            console.log(error)
        }
        
        try {
            await new Promise((resolve,reject)=>{
                const query="insert into friend_request (u_id,f_id) values(?,(select id from signup_table where phone_number=?))";
                connection.query(query,[id,data
                ],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result)
                });
            });
            return("Request Sent")
        } catch (error) {
            console.log(error)
        }
    }

    async friendRequest(id){
        try {
            const response=await new Promise((resolve,reject)=>{
                const query='SELECT signup_table.phone_number,signup_table.name,friend_request.id FROM signup_table JOIN friend_request ON friend_request.u_id=signup_table.id WHERE friend_request.f_id=?;'
                connection.query(query,[id],(err,result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result)
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async friendList(id){
        try {
            const response=await new Promise((resolve,reject)=>{
                const query='SELECT signup_table.id,signup_table.name,signup_table.profile_pic FROM signup_table JOIN friend_list ON friend_list.U_id=signup_table.id WHERE friend_list.F_id=? UNION SELECT signup_table.id,signup_table.name,signup_table.profile_pic FROM signup_table JOIN friend_list ON friend_list.F_id=signup_table.id WHERE friend_list.U_id=?;'
                connection.query(query,[id,id],(err,result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result)
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async handlefriendRequest(id,handle){
        if(handle==='accept'){
        try {
            const response=await new Promise((resolve,reject)=>{
                const query='INSERT INTO friend_list (U_id,F_id)SELECT u_id,f_id FROM friend_request WHERE id=? ;DELETE from friend_request where id=?'
                connection.query(query,[id,id],(err,result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result)
                });
            });
            return response 
        } catch (error) {
            console.log(error)
        }
    }
    else
    {
        try {
            const response=await new Promise((resolve,reject)=>{
                const query='DELETE from friend_request where id=?'
                connection.query(query,[id],(err,result)=>{
                    if (err) reject (new Error(err.message));
                    resolve(result)
                });
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }
    }
}

module.exports=dbcontact