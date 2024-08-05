const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");

const { getcomment, postcomment} = require("../../../controllers/v1");
const auth = require("../../../middleware/auth");
const { editComment, deleteComment, replyToComment } = require("../../../controllers/v1/comments");
router.post("/:postId/comments",auth, (req, res, next) =>
    dispatcher(req, res, next, postcomment)
);
router.get("/:postId/comments",(req,res,next)=>{
    dispatcher(req,res,next,getcomment)
});
router.put("/:postId/comments/:commentId",auth, (req, res, next) =>
    dispatcher(req, res, next, editComment)
);
router.delete("/:postId/comments/:commentId",auth, (req, res, next) =>
    dispatcher(req, res, next, deleteComment)
);
router.post("/:postId/comments/:commentId/reply",auth, (req, res, next) =>
    dispatcher(req, res, next, replyToComment)
);



module.exports = router;