const sequelize = require("../../../config/db");
const {AuthService, PostService} = require("../../../service/v1");
const { CommentService } = require("../../../service/v1/CommentService");

const postcomment = async (req, res, next) => {
  try {
    return  await new CommentService().postComment(req,res,next);
  } catch (error) {
    next(error);
  }
};
const getcomment = async (req,res,next) =>{
  try{
    return  await new CommentService().getComment(req,res,next);
    
    } catch (error) {
      next(error);
     }
}
module.exports = {
  getcomment,postcomment
};
