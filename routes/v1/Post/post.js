const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { validateToken } = require("../../../middleware");
const { getPost, updatePost, deletePost } = require("../../../controllers/v1");
const { sendPost } = require("../../../controllers/v1");
const { getSinglePost } = require("../../../controllers/v1");
router.get("/",(req, res, next) =>
    dispatcher(req, res, next, getPost)
);
router.post("/",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,sendPost)
});
router.get("/:id",(req,res,next)=>{
    dispatcher(req,res,next,getSinglePost)
});
router.put("/:id",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,updatePost)
});
router.delete("/:id",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,deletePost
    )
});

module.exports = router;