const { getPost } = require('./post.js')
const { sendPost } =require('./post.js')
const { getSinglePost} =require("./post.js")
const { updatePost,deletePost } =require("./post.js")

module.exports= { getPost,sendPost,getSinglePost,updatePost,deletePost}