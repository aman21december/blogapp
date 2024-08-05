const sequelize = require("../../../config/db");
const {AdminService} = require("../../../service/v1")

const siteStatistics = async (req, res, next) => {
  try {
    return  await new AdminService().siteStatistics(req,res,next);
  } catch (error) {
    next(error);
  }
};
const deletepost = async (req, res, next) => {
    try {
      return  await new AdminService().deletePost(req,res,next);
    } catch (error) {
      next(error);
    }
  };

const banAUser = async (req, res, next) => {
    try {
      return  await new AdminService().banAUser(req,res,next);
    } catch (error) {
      next(error);
    }
  };

module.exports={siteStatistics,deletepost,banAUser};