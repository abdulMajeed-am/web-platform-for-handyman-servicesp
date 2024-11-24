const mongoose = require('mongoose');
const {Schema} = mongoose;
const Category = new Schema({
    category_name:{
        type:String
    },
    category_image:{
        type:String
    },
    Date: {
        type: Date,
        default: Date.now 
    }
})
module.exports=mongoose.model('Category',Category);