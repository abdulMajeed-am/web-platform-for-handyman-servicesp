const mongoose = require('mongoose');
const {Schema} = mongoose;
const  Review = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserRegister'
    },
    worker_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'WorkerRegister'
    },
    reviews:{
        type:String
    },
    rating:{
        type:String
    },
    
    
    Date: {
        type: Date,
        default: Date.now 
    }
})
module.exports=mongoose.model('Review',Review);