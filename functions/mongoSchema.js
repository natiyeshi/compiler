const mongoose = require('mongoose');
const url = "mongodb+srv://natiyeshimongo:natiyeshimongo@cluster0.aliussy.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)

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
