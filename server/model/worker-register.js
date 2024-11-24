const mongoose = require('mongoose');
const {Schema} = mongoose;
const WorkerRegister = new Schema({
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
    pincode:{
        type:Number
    },
    profile:{
        type:String
    },
    cv:{
        type:String
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    password:{
        type:String
    },
    status:{
        type:String
    },
    Date: {
        type: Date,
        default: Date.now 
    }
})
module.exports=mongoose.model("WorkerRegister",WorkerRegister)
