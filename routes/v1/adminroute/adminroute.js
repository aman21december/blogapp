const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { siteStatistics, deletepost, banAUser } = require("../../../controllers/v1/admincontroller");
const auth = require("../../../middleware/auth");
const authorize = require("../../../middleware/authorize");
router.get("/dashboard",auth,authorize, (req, res, next) =>
    dispatcher(req, res, next, siteStatistics)
);

router.delete("/post/:postId",auth,authorize, (req, res, next) =>
    dispatcher(req, res, next, deletepost)
);

router.post("/users/:userId/ban",auth,authorize, (req, res, next) =>
    dispatcher(req, res, next, banAUser)
);

module.exports = router;