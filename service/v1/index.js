// const ReplaceWithService = require("./replace-with-service");
const {PostService}=require('./PostService')
const {AuthService}=require("./AuthService")
const {Profile}=require("./Profile")
const {LikeDislike}=require("./LikeDislike")
const {SearchandFilter}=require("./SearchandFilterService")
const {AdminService}=require("./AdminService")
module.exports = {
  PostService,AuthService,Profile,LikeDislike,SearchandFilter,AdminService
};
