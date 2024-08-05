module.exports=(req,res,next)=>{
    if(req.user && req.user.role=='admin'){
        next()
    }
    else{
        res.send("Access Denied... Admin only")
    }
}