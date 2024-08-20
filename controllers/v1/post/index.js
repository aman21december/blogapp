const { getPost } = require('./post.js')
const { sendPost } =require('./post.js')
const { getSinglePost} =require("./post.js")
const { updatePost,deletePost,getViewsForPost,populerPost } =require("./post.js")

module.exports= { getPost,sendPost,getSinglePost,updatePost,deletePost,getViewsForPost,populerPost}