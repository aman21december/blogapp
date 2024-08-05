const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { likePost,dislikePost, countlikes } = require("../../../controllers/v1/postengagement");
const auth = require("../../../middleware/auth");
router.post("/like/:postId",auth,(req, res, next) =>
    dispatcher(req, res, next, likePost)
);
router.post("/dislike/:postId",auth,(req, res, next) =>
    dispatcher(req, res, next, dislikePost)
);
router.post("/dislike/:postId",auth,(req, res, next) =>
    dispatcher(req, res, next, dislikePost)
);
router.get("/countlike/:postId",auth,(req, res, next) =>
    dispatcher(req, res, next, countlikes)
);
module.exports = router;