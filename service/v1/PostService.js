const { ErrorHandler } = require("../../helper");
const { SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } = require("../../helper/status-codes");
const Post=require("../../models/Post")
const {upload,moveFile,verifyFileContent}=require("./../../config/multer")
const path = require('path');
class PostService{
    async getPost(req,res,next){
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
    
        try {
            const posts = await Post.findAndCountAll({
                limit,
                offset,
                include: ['User']
            });
    
            return({
                posts: posts.rows,
                total: posts.count,
                page,
                totalPages: Math.ceil(posts.count / limit)
            });
        } catch (err) {
           if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
           throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
    async sendPost(req,res,next){
        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(err);
                }
                const { title, content } = req.body;
                const ans=await verifyFileContent(req.file);
                if(ans==false){
                    return reject(new ErrorHandler(SERVER_ERROR,"INVALID FILE TTPE"))
                }
                await moveFile(req.file, './uploads'); // Move to final destination
                req.file.path = path.join('./uploads', path.basename(req.file.path));
                try {
                    const newPost = await Post.create({
                        title,
                        content,
                        user_id: req.user.id,
                        image: req.file ? req.file.path : null
                    });
                    resolve(newPost);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    async getSinglePost(req,res,next){
        const { id } = req.params;
        try{
            const post = await Post.findByPk(id, {
                include: ['User']
            });
    
            if (!post) {
                throw new ErrorHandler(NOT_FOUND,"resource not found");
            }
    
            return(post);
        }
        catch(err){
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
           throw new ErrorHandler(SERVER_ERROR,err);
        }

    }
    async updatePost(req,res,next){
        const { id } = req.params;
        const { title, content} = req.body;
        try{
            const post = await Post.findByPk(id);

            if (!post) {
                throw new ErrorHandler(NOT_FOUND,"resource not found");
            }

        if (post.user_id !== req.user.id) {
            if (!post) {
                throw new ErrorHandler(UNAUTHORIZED,"UNAUTHORISED ACCESS");
            }

        }

        post.title = title;
        post.content = content;
        
        await post.save();

        return(post);
        }
        catch(err){
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }

     
    }
    async deletePost(req,res,next){
        try{
            const {id} = req.params
            const post=await Post.findByPk(id)
            if(!post){
                throw new ErrorHandler(NOT_FOUND,"resource not found");            }
            if (post.user_id !== req.user.id) {
                throw new ErrorHandler(UNAUTHORIZED,"UNAUTHORISED ACCESS");
            }
            await post.destroy();
            return({msg:"post deleted"})
        }
        catch(err){
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
}

module.exports={PostService};