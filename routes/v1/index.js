const express = require("express");
const app = express();

const { general } = require("./general");
const auth=require("./auth/auth")
const post =require("./Post/post");
const { comments } = require("./comments");
app.use("/", comments);
app.use("/auth",auth)
app.use("/posts",post)
module.exports = app;
