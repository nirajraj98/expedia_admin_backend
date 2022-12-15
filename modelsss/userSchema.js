const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
       
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    }
});

// createing model
const UserModel = new mongoose.model("admin", userSchema);

module.exports = UserModel;


// if (this.isModified("password")) {    }