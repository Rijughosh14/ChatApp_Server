const connection=require('../../MainDb.js')
let instance=null;
//const mysql=require('mysql');

class dbsignup{
    static getdbserviceinstance(){
        return instance?instance:new dbsignup();
    }


    async newUser(Phone_number,Name,Profile_pic){
        try {
          const result= await new Promise((resolve,reject)=>{
                const query="insert into signup_table(phone_number,name,profile_pic) values(?,?,?);select * from signup_table where phone_number=?;";
                connection.query(query,[Phone_number,Name,Profile_pic,Phone_number],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return result[1];
            
        } catch (error) {
            console.log(error)
        }
    }

    async update(Phone_number,Name,Profile_pic){
        try {
          const result= await new Promise((resolve,reject)=>{
                const query="update signup_table set name=?,profile_pic=? where phone_number=?;select * from signup_table where phone_number=?;";
                connection.query(query,[Name,Profile_pic,Phone_number,Phone_number],(err,result)=>{
                    if(err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return result[1];
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=dbsignup