const { upload } = require("../../config/multer-profilepic.js");
const { ErrorHandler } = require("../../helper");
const { SERVER_ERROR } = require("../../helper/status-codes");
const User = require("../../models/User");

class Profile{
    async getProfile(req,res,next){
        try{
        console.log(req.user)
        const user=await User.findByPk(req.user.id,{
            attributes:{exclude:['password']}
        });
        return(user);
        }catch(error){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);              
        }
    }
    async updateProfile(req,res,next){
        const { firstName,lastName}=req.body;
        try{
            await User.update({firstName,lastName},{where:{id:req.user.id}})
            return ({message:"profile updated successfully"})
        }
        catch(error)
        {
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);              
        }
    }
    async profilepic(req,res,next){
        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(err);
                }
                try {
                 const profilePictureUrl = `/uploads/profilePictures/${req.user.id}_${req.file.originalname}`;
                await User.update({ profilePicture: profilePictureUrl }, { where: { id: req.user.id } });
                resolve({ message: 'Profile picture uploaded successfully', profilePicture: profilePictureUrl });              
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    async notification(req,res,next){
        const { emailNotifications } = req.body;

    try {
        await User.update({ emailNotifications }, { where: { id: req.user.id } });
        return({ message: 'Notification settings updated' });
  } catch (error) {
        if (error.statusCode)
            throw new ErrorHandler(error.statusCode, error.message);
          throw new ErrorHandler(SERVER_ERROR, error);                  
  }
}
}


module.exports={Profile};