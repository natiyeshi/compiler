[1mdiff --git a/app.js b/app.js[m
[1mindex 76e966d..2fa450f 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -11,11 +11,9 @@[m [mconst {checkAuth,regCheck} = require('./functions/checkSession');[m
 [m
 // middle wares[m
 const app = express()[m
[31m-const port = process.env.PORT || 5000[m
 app.use(bodyParser.urlencoded({extended:true}))[m
 app.use(express.json())[m
 app.set("view engine","ejs")[m
[31m-[m
 // session[m
 app.use(session({[m
     resave:false,[m
[36m@@ -40,6 +38,6 @@[m [mapp.get("/",regCheck,(req,res)=>{[m
 })[m
 [m
 [m
[31m-app.listen(port,()=>{console.log("port - " + port);})[m
[32m+[m[32mapp.listen(5000,()=>{console.log("port - " + 5000);})[m
 [m
 [m
[1mdiff --git a/credential.md b/credential.md[m
[1mdeleted file mode 100644[m
[1mindex 8f81d89..0000000[m
[1m--- a/credential.md[m
[1m+++ /dev/null[m
[36m@@ -1,2 +0,0 @@[m
[31m-# username natiyeshimongo[m
[31m-# password natiyeshimongo[m
\ No newline at end of file[m
[1mdiff --git a/functions/mongoSchema.js b/functions/mongoSchema.js[m
[1mindex c68fa85..d618e7c 100644[m
[1m--- a/functions/mongoSchema.js[m
[1m+++ b/functions/mongoSchema.js[m
[36m@@ -1,6 +1,5 @@[m
 const mongoose = require('mongoose');[m
[31m-const url = "mongodb+srv://natiyeshimongo:natiyeshimongo@cluster0.aliussy.mongodb.net/?retryWrites=true&w=majority"[m
[31m-mongoose.connect(url)[m
[32m+[m[32mmongoose.connect("mongodb://localhost:27017/compiler")[m
 [m
 const userSchema = mongoose.Schema({ [m
     name:{[m
