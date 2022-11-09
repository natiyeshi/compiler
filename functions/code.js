const compiler = require('compilex');
compiler.init({stats:true})
const fs = require('fs');
/** python compiler */
function python(code) {
    return new Promise((res,rej)=>{
        const envData = {OS:"windows",options:{timeout:100000}}
        compiler.compilePython(envData,code,async(data)=>{
            try{
                const result = await data
                let ob ={}
                if(typeof(result.output) == 'undefined'){
                    ob.error = true
                    ob.result = result.error
                } else {
                    ob.error = false
                    ob.result = result.output
                }
                res(ob)
            }catch(err){
                rej(err)
            }
        })
    })
}
/** java compiler */
function java(code) {
    return new Promise((res,rej)=>{
        const envData = {OS:"windows",options:{timeout:100000}}
        compiler.compileJava(envData,code,async(data)=>{
            try{
                const result = await data
                let ob ={}
                if(typeof(result.output) == 'undefined'){
                    ob.error = true
                    ob.result = result.error
                } else {
                    ob.error = false
                    ob.result = result.output
                }
                res(ob)
            }catch(err){
                rej(err)
            }
        })
    })
}
/** cpp compiler */
function cpp(code) {
    return new Promise((res,rej)=>{
        const envData = {OS:"windows",cmd:"g++",options:{timeout:100000}}
        compiler.compileCPP(envData,code,async(data)=>{
            try{
                const result = await data
                let ob ={}
                if(typeof(result.output) == 'undefined'){
                    ob.error = true
                    ob.result = result.error
                } else {
                    ob.error = false
                    ob.result = result.output
                }
                res(ob)
            }catch(err){
                rej(err)
            }
        })
    })
}

module.exports = {cpp,python,java} 