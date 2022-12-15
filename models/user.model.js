const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    user_id:{type:Number},
    fname: { type: String, required: true, trim: true},
    email:{type:String, require:true,unique: true,},
    password:{type:String, require:true, minlength: 6},
    cpassword: { type: String,required: true,minlength: 6
    }
})

const UserModel=mongoose.model("admin",userSchema)
module.exports={UserModel}