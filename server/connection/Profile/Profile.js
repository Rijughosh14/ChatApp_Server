const connection =require('../../MainDb')
let instance=null;

class dbprofile{
    static getdbinstance(){
      return  instance?instance:new dbprofile()
    }

    async profile(id){
        try {
          const result= await new Promise((resolve,reject)=>{
                const query="SELECT * FROM signup_table WHERE id=?"
                connection.query(query,[id],(err,result)=>{
                    if(err) reject (new Error(err.message));
                    resolve(result);
                });
            });
            return result;
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=dbprofile