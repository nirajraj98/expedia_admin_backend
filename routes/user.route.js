const express=require("express")
const{ UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userController=express.Router()


userController.post("/signup",async(req,res)=>{
  
    const{fname,email,password,cpassword}=req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }
    bcrypt.hash(password,6,async function(err,hash){
        if(err){
            res.send("Something went wrong")
        }

        const user=new UserModel({
            fname,
            email,
            password:hash,
            cpassword:hash,
            
        })
        try{

            const preuser = await UserModel.findOne({ email: email });

            if (preuser) {
                res.status(422).json({ error: "This Email is Already Exist" })
            } else if (password !== cpassword) {
                res.status(422).json({ error: "Password and Confirm Password Not Match" })
            } else {
    
            await user.save()
            res.status(201).json({"msg":"Signup sucessfull"})
            }
    
        }catch(err){
          console.log(err)
          res.send({"masg":"Signup failed"})
        }
    })
})

userController.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    
    // const user=await UserModel.findOne({email})

    try {
        const user = await UserModel.find({ email });
    
        if (user.length > 0) {
          const hashed_password = user[0].password;
          bcrypt.compare(password, hashed_password, function (err, result) {
            if (result) {
              const token = jwt.sign({ userId: user[0]._id }, process.env.PRIVATE_KEY);
              res.status(200).json({ msg: "Login successfull", token: token });
            } else {
                res.status(201).json({ msg: "Login failed"})
            }
          });
        } else {
            res.status(201).json({ msg: "Login failed"})
        }
      } catch {
        res.status(201).json("Something went wrong, please try again later");
      }



    // const hashed_password=user.password

    // bcrypt.compare(password,hashed_password, function (err,result){
    //     if(err){
    //         res.send("Something went wrong")
    //     }

    //     if(result){
    //         const token=jwt.sign({userId:user._id},process.env.PRIVATE_KEY);
    //         res.send({"msg":"Login sucessfull",token:token})
    //     }else{

    //         res.send({"msg":"Invalid credentials ",token:token})
    //     }
    // })


})
module.exports={userController}