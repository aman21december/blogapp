const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { getUserProfile,updateProfile, updateProfilepic } = require("../../../controllers/v1/user");
const auth = require("../../../middleware/auth");
const { notification } = require("../../../controllers/v1/user/user");
router.get("/profile",auth,(req, res, next) =>
    dispatcher(req, res, next, getUserProfile)
);
router.put("/profile",auth,(req, res, next) =>
    dispatcher(req, res, next, updateProfile)
);
router.post("/profilepic",auth,(req, res, next) =>
    dispatcher(req, res, next, updateProfilepic)
);
router.post("/notification",auth,(req,res,next)=>[
    dispatcher(req, res, next, notification)
])
module.exports = router;

