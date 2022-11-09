function checkAuth(req,res,next) {
    if(!req.session.authenticated){
        return res.redirect("/")
    }
    next()
}

function regCheck(req,res,next) {
    if(req.session.authenticated){
        return res.redirect("/run")
    }
    next()
}

module.exports = {checkAuth,regCheck}