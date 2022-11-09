const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/compiler")

const userSchema = mongoose.Schema({ 
    name:{
        type:String,
        minLength:3,
        maxLength:12
    },
    code:[
        {   
            lang:String,
            code:String,
            error:Boolean,
            runTime:{
                type:Date,
                default:()=> Date.now()
            }
        },
    ],
})

module.exports = mongoose.model("file",userSchema)
