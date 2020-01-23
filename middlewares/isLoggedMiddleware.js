const isLoggedMiddleware = (req,res,next) => {

    const isLogged = req.session.userId ? true : false;
    next();
}
module.exports = isLoggedMiddleware;