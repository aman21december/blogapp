const { ErrorHandler } = require("../../helper");
const { SERVER_ERROR } = require("../../helper/status-codes");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");

class AdminService{
    async siteStatistics(req,res,next){
        try {
            const userCount = await User.count();
            const postCount = await Post.count();
            const commentCount = await Comment.count();
    
            res.json({
                users: userCount,
                posts: postCount,
                comments: commentCount
            });
        } catch (error) {
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
              
        }
    }
    async deletePost(req,res,next){
        const { postId } = req.params;
        try {
            const post = await Post.findByPk(postId);
    
            if (!post) {
                return ({ error: 'Post not found' });
            }
    
            await post.destroy();
            return({ message: 'Post deleted successfully' });
        } catch (error) {
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
        }
    }
    async banAUser(req,res,next){
        const {userId}=req.params;
        try{
            const  user=await User.findByPk(userId);
            if(!user){
                return ({message:"User not found"})
            }
            user.isBanned=!user.isBanned;
            await user.save()
            return ({msg:`User ${user.isBanned?'banned':'unbanned'} successfully`})
        }     
        catch(err){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
        }
    }
}
module.exports={AdminService};