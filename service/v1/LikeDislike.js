const { where } = require("sequelize");
const { SERVER_ERROR } = require("../../helper/status-codes");
const Like=require("../../models/Like")
const {ErrorHandler}=require("./../../helper/error-handler")
const path=require("path");
const ejs=require("ejs");
const {sendEmail}=require("../../utils/sendMail");
const User = require("../../models/User");
const Post = require("../../models/Post");
class LikeDislike
{
    async likeThePost(req,res,next){
        try{
           
            const {postId} =req.params;
            const userId=req.user.id;
            const existingLike=await Like.findOne({where:{user_id:userId,post_id:postId}});
            const user=await User.findByPk(userId)
            const post=await Post.findByPk(postId)
            if(existingLike){
                if(existingLike.is_like){
                    return({error:"you have already like the post"})
                }
                else{
                    await existingLike.update({
                        is_like:true
                    })
                    return(
                        "liked the post"
                    )
                }
            }else{
                const like=await Like.create({ user_id: userId, post_id: postId, is_like: true });
                const templatePath=path.join(__dirname+"../../../views/emails/new-like.ejs")
            
                const html = await ejs.renderFile(templatePath,{  
                    username: user.username,
                    postTitle: post.title,})
                await sendEmail(user.email, 'New Like on Your Post', html);
                return ({like})
            }
        }catch(error){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);            
        }
        
    }

    async dislikeThePost(req,res,next){
        try{
           
            const {postId} =req.params;
            const userId=req.user.id;
            const existingLike=await Like.findOne({where:{user_id:userId,post_id:postId}});
            
            if(existingLike){
                if(!existingLike.is_like){
                    return({error:"you have already dislike the post"})
                }
                else{
                    await existingLike.update({
                        is_like:false
                    })
                    return(
                        "disliked the post"
                    )
                }
            }else{
                const dislike=await Like.create({ user_id: userId, post_id: postId, is_like: false });
                return ({dislike})
            }
        }catch(error){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
              
        }
        
    }
    async countlikes(req,res,next){
        try{
            const {postId}=req.params;
            const likesCount = await Like.count({
                where: {
                    post_id: postId,
                    is_like: true
                }
            });
            const dislikesCount=await Like.count({
                where:{
                    post_id:postId,
                    is_like:false
                }
            })
            return({likes:likesCount,dislikes:dislikesCount})
        }catch(error){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
              
        }
    }
}

module.exports={LikeDislike}