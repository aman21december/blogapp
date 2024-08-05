const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { getUserProfile,updateProfile, updateProfilepic } = require("../../../controllers/v1/user");
const auth = require("../../../middleware/auth");
router.get("/profile",auth,(req, res, next) =>
    dispatcher(req, res, next, getUserProfile)
);
router.put("/profile",auth,(req, res, next) =>
    dispatcher(req, res, next, updateProfile)
);
router.post("/profilepic",auth,(req, res, next) =>
    dispatcher(req, res, next, updateProfilepic)
);
module.exports = router;

