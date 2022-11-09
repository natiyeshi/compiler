const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
// my module
const {userRegisterSchema} = require('../functions/joiSchema');
const {mongoRegister} = require('../functions/mongoose');

router.use(bodyParser.urlencoded({extended:true}))

router.post("/",async (req,res)=>{
   const { name } = req.body
   let val = userRegisterSchema.validate({name}) 
   if(val.error){
        return res.status(400).send(val.error.details[0].message)
    }
   const result = await mongoRegister(name)
   if(result.reg == true){
        req.session.authenticated = true
        req.session.name = name
        req.session.userid = result.id
        return res.send("registered")
   } 
   return res.send("not registerd")
 
})

module.exports = router