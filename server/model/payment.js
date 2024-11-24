
const mongoose = require('mongoose');
const {Schema} = mongoose;
const Payment = new Schema({
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
    booking_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    },
   transaction_id:{
    type:String
   },
   total:{
    type:String
   },
   admin_pay:{
    type:String
   },
    
    status:{
        type:String,
        default:'Paid'
    },
    PayedDate:{
        type:Date,
        default:Date.now,
    }

})
module.exports=mongoose.model("Payment",Payment)
