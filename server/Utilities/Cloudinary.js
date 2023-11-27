const cloudinary=require('cloudinary').v2
const fs=require('fs')
          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});


const uploadCloudinary= async(filepath)=>{

    try {
        if(!filepath) return null
        //upload file on cloudinary
       const response=await cloudinary.uploader.upload(filepath,{
            resource_type:'auto'
        })
        return response.secure_url
    } catch (error) {
        fs.unlinkSync(filepath) //remove the locally saved temporary file
        return null
    }
}




module.exports={uploadCloudinary}
