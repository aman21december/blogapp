const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const auth = require("../../../middleware/auth");
const { search, filter } = require("../../../controllers/v1/SearchandFiltercontroller");
router.get("/",(req, res, next) =>
    dispatcher(req, res, next, search)
);
router.get("/filter",(req, res, next) =>
    dispatcher(req, res, next, filter)
);

module.exports = router;