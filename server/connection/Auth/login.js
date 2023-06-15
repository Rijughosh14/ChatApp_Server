const connection =require('../../MainDb')
let instance=null;

class dblogin{
    static getdbinstance(){
      return  instance?instance:new dblogin()
    }

    async login(Phone_number){
        try {
          const result= await new Promise((resolve,reject)=>{
                const query="SELECT * FROM signup_table WHERE phone_number=?"
                connection.query(query,[Phone_number],(err,result)=>{
                    if(err) reject (new Error(err.message));
                    resolve(result);
                });
            });
            return result;
            
        } catch (error) {
            console.log(error);
        }
    }

    
    async userExistence(userPhone){
        try {
      const result= await new Promise((resolve,reject)=>{
                const query="SELECT * FROM signup_table WHERE phone_number=?"
                connection.query(query,[userPhone],(err,result)=>{
                    if(err) reject (new Error(err.message));
                    resolve(result);
                });              
            });
            return result
            
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=dblogin;