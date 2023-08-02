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

function addition(a,b){
    return a + b
}

module.exports = checkAuth
module.exports = regCheck
ans = addition(1,3)
print(ans)