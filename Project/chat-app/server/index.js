const express = require("express")
const path=require("path")
const cors = require("cors")
const mongoose=require("mongoose")
const userRoute=require("./Routes/userRoute")
const chatRoute=require("./Routes/chatRoute")
const messageRoute=require("./Routes/messageRoute")


const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);



//only crete and read data
app.get("/",(req,res)=>{
    res.send("Welcome our chat API... vikash kumar")
})



const port = process.env.PORT||5000;
const uri = process.env.ATLAS_URI;

app.listen(port, ( req,res ) =>{
       console.log(`server running on port... : ${port} `)
})




mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=> console.log("MongoDb connected -->")).catch((error)=>console.log('MogoDb failed :',error.message));

// const __dirname1=path.resolve()
// if(process.env.NODE_ENV==='production'){
    
//     app.use(express.static(path.join(__dirname1,"/frontened/build")))
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname1,"client","dist","assets","index.html"))
//     })
// }
// else{
//     app.get("/", (req,res)=>{
//         res.send("API is running successfully")
//     })
// }