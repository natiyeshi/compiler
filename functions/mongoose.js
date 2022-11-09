const mongoRegisterSchema = require('./mongoSchema');

async function mongoRegister(name){
    try{
        const userName = await mongoRegisterSchema.create({name:name})
        return {reg:true,id:userName._id}
    } catch(e){
        return {reg:false}
    }
}

async function mongoSaveFile(id,lang,code,run){
    try{
        console.log(id,lang,code,run);
        const updateFile = await mongoRegisterSchema.where("_id").equals(id)
        let len = updateFile[0].code.length
        if(len > 2) updateFile[0].code.shift()
        updateFile[0].code.push({lang:lang,code:code,error:run})
        await updateFile[0].save() 
        return updateFile[0]
    } catch(e){
        console.log("e == ",e);
        return false
    }
}

async function lastSubmit(id,val) {
    try{
       
        val -= 1
        const userName = await mongoRegisterSchema.findOne({_id:id})
        return {err:false,value:userName.code}
    } catch(e){
        console.log(e);
        return {err:true}
    } 
}


module.exports = {mongoRegister,mongoSaveFile,lastSubmit}