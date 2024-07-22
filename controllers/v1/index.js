const { createApi } = require("./general");
const {login}=require("./auth")
const {signup} =require("./auth")
const {getPost}=require("./post");
const { sendPost } = require("./post/post");
const { getSinglePost } = require("./post/post");
const { updatePost,deletePost } = require("./post/post");
const { postcomment,getcomment } = require("./comments/comments");
module.exports = {
  createApi,  login,
  signup,getPost,sendPost,getSinglePost,updatePost,deletePost
  ,getcomment,postcomment
};
