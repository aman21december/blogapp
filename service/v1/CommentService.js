const { ErrorHandler } = require("../../helper");
const { NOT_FOUND, SERVER_ERROR, BAD_GATEWAY } = require("../../helper/status-codes");
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");

class CommentService{
    async postComment(req,res,next){
        const { postId } = req.params;
        const { content } = req.body;
    
        try {
            const post = await Post.findByPk(postId);
    
            if (!post) {
                throw new ErrorHandler(NOT_FOUND,"resource not found");   
            }
    
            const newComment = await Comment.create({
                content,
                user_id: req.user.id,
                post_id: postId
            });
    
            return(newComment);
        } catch (err) {
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
    async getComment(req,res,next){
        const { postId } = req.params;
        try {
            const comments = await Comment.findAll({
                where: { post_id: postId },
                include: ['User']
            });
    
            return(comments);
        } catch (err) {
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
    async editComment(req,res,next){
        
        const {postId,commentId}=req.params;
        const {content}=req.body;
        console.log(postId)
        try{
            const comment=await Comment.findOne({
                where:{
                    id:commentId,
                    post_id:postId,
                    user_id:req.user.id
                }
            })
            
            if(!comment){
                throw new ErrorHandler(
                    NOT_FOUND,
                    "comment not found",
                  );
            }
            comment.content=content;
            await comment.save();
            return({comment})
        }
        catch(error){
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
    }
}
    async deleteComment(req,res,next){
        const { postId, commentId } = req.params;

        try {
            const comment = await Comment.findOne({
                where: {
                    id: commentId,
                    post_id: postId,
                    user_id: req.user.id
                }
            });
    
            if (!comment) {
                throw new ErrorHandler(NOT_FOUND,'Comment not found or you do not have permission to delete this comment' )
            }
    
            await comment.destroy();
            return({ message: 'Comment deleted successfully' });
        } catch (error) {
            if (error.statusCode)
                throw new ErrorHandler(error.statusCode, error.message);
              throw new ErrorHandler(SERVER_ERROR, error);
        }
    }
    async replyToComment(req,res,next){
        const { postId, commentId } = req.params;
        const { content } = req.body;
    
        try {
            const parentComment = await Comment.findOne({
                where: {
                    id: commentId,
                    post_id: postId
                }
            });
    
            if (!parentComment) {
                return res.status(404).json({ error: 'Parent comment not found' });
            }
    
            const newComment = await Comment.create({
                content,
                user_id: req.user.id,
                post_id: postId,
                parent_id: commentId
            });
    
            res.json(newComment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    
    }
}

module.exports={CommentService}