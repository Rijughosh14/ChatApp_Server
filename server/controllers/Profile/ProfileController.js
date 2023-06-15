const dbprofile = require("../../connection/Profile/Profile.js")

const userProfile=async(req,res)=>{
    const id=req.query.id
    const db=dbprofile.getdbinstance();
    const result=await db.profile(id);
    if (result.length!=0)
    {
    return res.send(result)
    }
    else
    { 
    return res.send({exist:false})
    }
}

module.exports={userProfile}