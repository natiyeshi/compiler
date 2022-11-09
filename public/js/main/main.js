var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
document.getElementById('editor').style.fontSize='17px';
editor.setReadOnly(false);

ace.config.set("basePath", "https://url.to.a/folder/that/contains-ace-modes");
ace.config.setModuleUrl("ace/theme/textmate", "url for textmate.js");
let ob = {
    cpp : "c_cpp",
    c : "c_cpp",
    java:"java",
    python:"python"
}

const lang = document.getElementById("lang")
const send = document.getElementById("send")
const answer = document.getElementById("answer")

lang.addEventListener("change",()=>{
    let val = ob[lang.value]
    console.log(val);
    editor.session.setMode("ace/mode/"+val);
})

send.addEventListener("click",()=>{
    let language = ob[lang.value]
    let code = editor.getValue()
   sendCode(language,code)
})

function sendCode(lang,code) {
   let xml = new XMLHttpRequest()
   xml.open("post","/run")
   xml.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
   xml.onload = function(){
    if(this.status == 200){
        const {result} =JSON.parse(this.responseText)
        let ress = result.split("\n")
        ress = ress.join("")
        answer.innerText = ress
        send.disabled = false
        answer.style.backgroundImage = ""
        send.value = "submit"
        send.setAttribute("class","btn btn-success")

    } 
    
   }
   
   xml.addEventListener("loadstart",()=>{
    send.disabled = true 
    send.value = "wait..."
    answer.style.backgroundImage = "url('./image/Spinner-1s-200px-unscreen.gif')"
    answer.style.backgroundRepeat = "no-repeat"
    answer.style.backgroundSize = "auto"
    answer.style.backgroundPosition = "center"
   })
   let c = {
    lang:lang,
    code:code
   }
   console.log(c);
   xml.send(JSON.stringify(c))
}

editor.session.on('change', function(delta) {
    send.setAttribute("class","btn btn-warning")
});