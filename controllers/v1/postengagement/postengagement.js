const sequelize = require("../../../config/db");
const { LikeDislike } = require("../../../service/v1");
const {Profile} = require("../../../service/v1");

const likePost = async (req, res, next) => {
  try {
    return  await new LikeDislike().likeThePost(req,res,next);
  } catch (error) {
    next(error);
  }
};
const dislikePost = async (req, res, next) => {
    try {
      return  await new LikeDislike().dislikeThePost(req,res,next);
    } catch (error) {
      next(error);
    }
  };

  const countlikes = async (req, res, next) => {
    try {
      return  await new LikeDislike().countlikes(req,res,next);
    } catch (error) {
      next(error);
    }
  };  
module.exports={likePost,dislikePost,countlikes};