const logout_post=async (req,res)=>{
    try {
       return  await res.clearCookie('userId').json("logout successful")   
    } catch (error) {
        console.log(error)
    }

}

module.exports={logout_post}