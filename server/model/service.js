const mongoose = require('mongoose');
const {Schema} = mongoose;
const Service = new Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    worker_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WorkerRegister'
    },
    service_name:{
        type:String
    },
    service_charge:{
        type:Number
    },
    service_image:{
        type:String
    },
    units:{
        type:String
    },
    description:{
        type:String
    },
    Date: {
        type: Date,
        default: Date.now 
    }
})
module.exports=mongoose.model('Service',Service);