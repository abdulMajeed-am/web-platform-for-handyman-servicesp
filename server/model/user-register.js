const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserRegister = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
  
    password:{
        type:String
    }
})
module.exports=mongoose.model("UserRegister",UserRegister)
