const sequelize = require("../../../config/db");
const { LikeDislike } = require("../../../service/v1");
const {SearchandFilter} = require("../../../service/v1");
const search = async (req, res, next) => {
    try {
      return  await new SearchandFilter().search(req,res,next);
    } catch (error) {
      next(error);
    }
  };  

const filter = async (req, res, next) => {
    try {
      return  await new SearchandFilter().filter(req,res,next);
    } catch (error) {
      next(error);
    }
  };  

  module.exports={search,filter}