const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router()

const {lastSubmit} = require('../functions/mongoose');

router.use(bodyParser.urlencoded({extended:false}))


router.post("/",async (req,res)=>{
    const {num} = req.body
    const {userid} = req.session
    var sendOb = {}
    try{
        const file = await lastSubmit(userid,num)
        return res.send(JSON.stringify(file))
    } catch(e){
        console.log("error$##@",e);
        sendOb.err = true
        return res.send(JSON.stringify(sendOb))
    }
})

module.exports = router