const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router()
const {python,java,cpp} = require("../functions/code")
const {mongoSaveFile} = require('../functions/mongoose');


router.use(bodyParser.urlencoded({extended:true}))

router.get("/",async (req,res)=>{
    res.render("index")
})

router.post("/",async (req,res)=>{
    const {code,lang} = req.body
    const { userid } = req.session
   
    if(lang == "python"){ 
        let result = await python(code)
        await mongoSaveFile(userid,lang,code,result.error)
        return res.send(JSON.stringify(result))
    } else if(lang == "c" || lang == "c_cpp"){
        let result = await cpp(code)
        await mongoSaveFile(userid,lang,code,result.error)
        return res.send(JSON.stringify(result))
    } else if(lang == "java"){
        let result = await java(code)
        await mongoSaveFile(userid,lang,code,result.error)
        return res.send(JSON.stringify(result))
    }
})


router.get("/",(req,res)=>{res.redirect("/")})

module.exports = router