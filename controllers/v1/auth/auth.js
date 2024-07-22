const sequelize = require("../../../config/db");
const {AuthService} = require("../../../service/v1")

const login = async (req, res, next) => {
  try {
    return  await new AuthService().login(req,res,next);
  } catch (error) {
    next(error);
  }
};
const signup = async (req,res,next) =>{
  try{
    return  await new AuthService().signup(req,res,next);
    
    } catch (error) {
      next(error);
     }
}
module.exports = {
  login,signup
};
