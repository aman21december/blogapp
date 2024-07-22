const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");

const { getcomment, postcomment} = require("../../../controllers/v1");
const auth = require("../../../middleware/auth");
router.post("/:postId/comments",auth, (req, res, next) =>
    dispatcher(req, res, next, postcomment)
);
router.get("/:postId/comments",(req,res,next)=>{
    dispatcher(req,res,next,getcomment)
});


module.exports = router;