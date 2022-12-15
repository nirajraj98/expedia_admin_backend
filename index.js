const express=require("express")
require("dotenv").config()
const {connection} =require("./configs/db")

const {userController}=require("./routes/user.route")
const {authentication}=require("./middleware/authentication")
const cors=require("cors")

const app=express()
app.use(express.json())

app.use(cors({
  origin:"*"
})
);
const PORT=process.env.PORT ||3000

// app.get("/",(req,res)=>{
//   res.send("app is working")
// })

app.use("/admin", userController)
app.use(authentication)



app.listen(PORT,async()=>{
    try{
      await connection
      console.log("connteced sucessfully")
    }catch(err){
        console.log("ERROR to connnect to db")
        console.log(err)

    }

    console.log(`Listening at http://localhost:${PORT}`)
})