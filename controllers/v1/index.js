const { createApi } = require("./general");
const {login}=require("./auth")
const {signup} =require("./auth")
const {getPost}=require("./post");
const { sendPost } = require("./post/post");
const { getSinglePost } = require("./post/post");
const { updatePost,deletePost } = require("./post/post");
const { postcomment,getcomment } = require("./comments/comments");
const { likePost,dislikePost,countlikes } = require("./postengagement/postengagement");
const { banAUser } = require("./admincontroller");

module.exports = {
  createApi,  login,
  signup,getPost,sendPost,getSinglePost,updatePost,deletePost
  ,getcomment,postcomment,likePost,dislikePost,countlikes,banAUser
};
