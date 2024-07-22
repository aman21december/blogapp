const { ErrorHandler } = require("../../helper");
const { NOT_FOUND, SERVER_ERROR } = require("../../helper/status-codes");
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
}

module.exports={CommentService}