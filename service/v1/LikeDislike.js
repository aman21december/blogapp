const { where } = require("sequelize");
const { SERVER_ERROR } = require("../../helper/status-codes");
const Like=require("../../models/Like")
const {ErrorHandler}=require("./../../helper/error-handler")
class LikeDislike
{
    async likeThePost(req,res,next){
        try{
           
            const {postId} =req.params;
            const userId=req.user.id;
            const existingLike=await Like.findOne({where:{user_id:userId,post_id:postId}});
            
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