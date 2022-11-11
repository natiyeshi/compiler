var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
document.getElementById('editor').style.fontSize='17px';
editor.setReadOnly(false);

let ob = {
    "cpp" : "c_cpp",
    "c++" : "c_cpp",
    "c" : "c_cpp",
    "java":"java",
    "python":"python"
}

const dark = document.getElementById("dark")
const about = document.getElementById("about")
const profile = document.getElementById("profile")
const closer = document.getElementById("closer")
const lang = document.getElementById("lang")
const errorClass = document.querySelector(".errorClass")
const errorMessage = document.querySelector(".errorMessage")
const send = document.getElementById("send")
const progress = document.getElementById("progress")
const progressInfo = document.querySelector(".progressInfo")
const answer = document.getElementById("answer")
const defaultSelect = document.getElementById("defaultSelect")
const left = document.getElementById("left")
const right = document.getElementById("right")
const langs = document.querySelectorAll(".langs")

var lastSubmitValue = 3
var onlineLang = "python"
langs.forEach(element => {
    element.addEventListener("click",()=>{
        changeLang(ob[element.innerText],element)
    })
});

function changeLang(val,activeElem){
    langs.forEach(element => {
        element.setAttribute("style","background:#f7f7f7;")
        if(element == activeElem){
            element.setAttribute("style","background:darkorange;")
            onlineLang = val
        }
    })
    editor.session.setMode("ace/mode/"+val);
}

(function(){
    errorClass.setAttribute("style","background:#9B9B9B;")
    document.querySelector(".langs").setAttribute("style","background:darkorange;")
})()

right.addEventListener("click",()=>{
    if(lastSubmitValue > 0)
        return getLastSubmit(lastSubmitValue--)
    else 
        return getLastSubmit(lastSubmitValue = 0)

})

left.addEventListener("click",()=>{
    if(lastSubmitValue < 3)
        return getLastSubmit(lastSubmitValue++)
    else 
        return getLastSubmit(lastSubmitValue = 2)
 
})

about.addEventListener("click",()=>{
    profile.style.display = "flex"
})
closer.addEventListener("click",()=>{
    profile.style.display = "none"
})

send.addEventListener("click",()=>{
    lastSubmitValue = 0
    let code = editor.getValue()
   sendCode(onlineLang,code)
})
var bgbool = false
dark.addEventListener("click",()=>{
    if(bgbool == false){
        dark.setAttribute("class","btn btn-light")
        dark.innerHTML = "off dark mode"
        document.body.style.backgroundImage ="url('../../image/dark.svg')"
    }else {
        document.body.style.backgroundImage ='url("../image/pattern-randomized.svg")'
        dark.setAttribute("class","btn btn-dark")
        dark.innerHTML = "on dark mode"
    }
    bgbool = !bgbool
})

function sendCode(lang,code) {
   progress.value = 0
   let xml = new XMLHttpRequest()
   xml.open("post","/run")
   xml.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
   xml.onload = function(){
    if(this.status == 200){
        const {result,error} =JSON.parse(this.responseText)
        let ress = result.split("\n")
        ress = ress.join("")
        answer.innerText = ress
        send.disabled = false
        answer.style.backgroundImage = ""
        send.value = "submit"  
        send.setAttribute("class","btn btn-success text-center mt-2 me-5")
        progress.value = 100
        progressInfo.innerHTML = "compiled"
        if(error == true){
            errorMessage.innerHTML = "Run time error"
            errorClass.setAttribute("style","background:#d9534f;")
        } else{
            errorMessage.innerHTML = "Compiled Successfully"
            errorClass.setAttribute("style","background:#5cb85c;")
        }
    }  
    
   }
   
   xml.addEventListener("loadstart",()=>{
    send.disabled = true 
    send.value = "wait..."
    answer.style.backgroundImage = "url('./image/Spinner-1s-200px-unscreen.gif')"
    answer.style.backgroundRepeat = "no-repeat"
    answer.style.backgroundSize = "auto"
    errorClass.setAttribute("style","background:#9B9B9B;")
    answer.style.backgroundPosition = "center"
    progress.value = 35
    errorMessage.innerHTML = "on progress ..."
    progressInfo.innerHTML = "compiling ..."
   })
   let c = {
    lang:lang,
    code:code
   }
   xml.send(JSON.stringify(c))
}

editor.session.on('change', function(delta) {
    send.setAttribute("class","btn btn-warning text-center mt-2 me-5")
    // defaultSelect.selected = true
});


function getLastSubmit(val){
    let file = {num:val}
    let xml = new XMLHttpRequest()
    xml.open("post","/lastSubmit")
    xml.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xml.onload = function(){
        if(this.status == 200){
            const fileSend = JSON.parse(this.responseText)
            console.log(fileSend);
            if(fileSend.err == true){
                return alert("Something happend")
            }
            if(fileSend.value[val] == undefined){
                // return alert("not available")
                return
            }
            editor.setValue(fileSend.value[val].code);
        }
    }
    xml.send(JSON.stringify(file))
} 
