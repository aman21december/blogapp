const express = require("express");
const app = express();

const { general } = require("./general");
const auth=require("./auth/auth")
const post =require("./Post/post");
const { comments } = require("./comments");
const { user } = require("./user");
const { postEngagement } = require("./postEngagement");
const {searchandfilter}=require("./SearchandFilterroutes");
const { adminrouter } = require("./adminroute");
app.use("/", comments);
app.use("/auth",auth)
app.use("/posts",post)
app.use("/user",user)
app.use("/post",postEngagement)
app.use("/search",searchandfilter)
app.use("/filter",searchandfilter)
app.use("/admin",adminrouter)
module.exports = app;
