exports.isLoggedIn = (req,res ,next)=>{
    if(!req.session.user){
        return res.status(401).json({message:'you are not allowed to carry this function'})
    }
    next()
};