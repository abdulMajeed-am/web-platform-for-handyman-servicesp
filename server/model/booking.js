const { request } = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const Booking = new Schema({
    worker_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WorkerRegister'
    },
    service_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserRegister'
    },
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
  
    date:{
        type:Date
    },
    time:{
        type:String
    },
    work:{
        type:Number
    },
    total:{
        type:Number
    },
    request:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    },
    BookedDate:{
        type:Date,
        default:Date.now,
    }

})
module.exports=mongoose.model("Booking",Booking)
