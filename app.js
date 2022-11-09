const bodyParser = require('body-parser');
const express = require('express');
const compiler = require('compilex');
const session = require('express-session');

// my modules 
const runRouter = require('./routers/run');
const registerRouter = require('./routers/register');
const {checkAuth,regCheck} = require('./functions/checkSession');
// middle wares
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
// session
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"abekfkladsjiodsfak"
}))
// static setup
app.use(express.static('public')); 
app.use("/css",express.static(__dirname + "public/css"))
app.use("/js",express.static(__dirname + "public/js"))
app.use("/image",express.static(__dirname + "public/image"))



// urls 
app.use("/run",checkAuth,runRouter)
app.use("/register",regCheck,registerRouter)

app.get("/",regCheck,(req,res)=>{
    res.render("register")
})


app.listen(5000,()=>{console.log("port - " + 5000);})


