const sequelize = require("../../../config/db");
const {PostService} = require("../../../service/v1")

const getPost = async (req, res, next) => {
  try {
    return  await new PostService().getPost(req,res,next);
  } catch (error) {
    next(error);
  }
};
const sendPost = async (req,res,next) =>{
  try{
    return  await new PostService().sendPost(req,res,next);
    } catch (error) {
      next(error);
     }
}
const getSinglePost = async (req,res,next) =>{
    try{
      return  await new PostService().getSinglePost(req,res,next);
      } catch (error) {
        next(error);
       }
  }
  const updatePost = async (req,res,next) =>{
    try{
      return  await new PostService().updatePost(req,res,next);
      } catch (error) {
        next(error);
       }
  }
  const deletePost = async (req,res,next) =>{
    try{
      return  await new PostService().deletePost(req,res,next);
      } catch (error) {
        next(error);
       }
  }
  const getViewsForPost = async (req,res,next) =>{
    try{
      return  await new PostService().getViewsForPost(req,res,next);
      } catch (error) {
        next(error);
       }
  }
  const populerPost = async (req,res,next) =>{
    try{
      return  await new PostService().populerPost(req,res,next);
      } catch (error) {
        next(error);
       }
  }
module.exports = {
  getPost,sendPost,getSinglePost,updatePost,deletePost,getViewsForPost,populerPost
};
