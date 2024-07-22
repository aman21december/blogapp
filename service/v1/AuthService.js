const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const User = require("../../models/User");
const { NOT_FOUND, UNAUTHORIZED } = require("../../helper/status-codes");
const { ErrorHandler } = require("../../helper");
class AuthService{
    async signup(req,res,next){
        const { username, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: hashedPassword });
            return(newUser);
        } catch (err) {
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
    async login(req, res, next){
        const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ where: { email } });
    
            if (!user) {
                throw new ErrorHandler(UNAUTHORIZED,"Invalid email or password");
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                throw new ErrorHandler(UNAUTHORIZED,"Invalid email or password");   
            }
    
            const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
            return({ token });
        } catch (err) {
            if (err.statusCode)throw new ErrorHandler(err.statusCode,err.message);
            throw new ErrorHandler(SERVER_ERROR,err);
        }
    }
}
module.exports={AuthService};