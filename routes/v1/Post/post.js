const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { validateToken } = require("../../../middleware");
const { getPost, updatePost, deletePost } = require("../../../controllers/v1");
const { sendPost } = require("../../../controllers/v1");
const { getSinglePost } = require("../../../controllers/v1");
const trackViews = require("../../../middleware/trackViews");
const { getViewsForPost, populerPost } = require("../../../controllers/v1/post");
router.get("/populer",(req,res,next)=>{
    dispatcher(req,res,next,populerPost
    )
});
router.get("/",(req, res, next) =>
    dispatcher(req, res, next, getPost)
);
router.post("/",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,sendPost)
});
router.get("/:id",trackViews,(req,res,next)=>{
    dispatcher(req,res,next,getSinglePost)
});
router.get("/:id/views",(req,res,next)=>{
    dispatcher(req,res,next,getViewsForPost)
});
router.put("/:id",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,updatePost)
});
router.delete("/:id",validateToken,(req,res,next)=>{
    dispatcher(req,res,next,deletePost
    )
});



module.exports = router;