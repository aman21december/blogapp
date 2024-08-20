const sequelize = require("../../../config/db");
const { PostService } = require("../../../service/v1");
const {Profile} = require("../../../service/v1");

const getUserProfile = async (req, res, next) => {
  try {
    return  await new Profile().getProfile(req,res,next);
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    return  await new Profile().updateProfile(req,res,next);
  } catch (error) {
    next(error);
  }
};
const updateProfilepic = async (req, res, next) => {
  try {
    return  await new Profile().profilepic(req,res,next);
  } catch (error) {
    next(error);
  }
};
const notification = async (req, res, next) => {
  try {
    return  await new Profile().notification(req,res,next);
  } catch (error) {
    next(error);
  }
};

module.exports={getUserProfile,updateProfile,updateProfilepic,notification};