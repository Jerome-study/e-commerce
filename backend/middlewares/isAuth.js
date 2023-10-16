function isAuth (req,res,next) {
    if(req.session.isAuth) {
        return next();
    }
    res.send({message: "What are you doing here?"})
};

module.exports = { isAuth };