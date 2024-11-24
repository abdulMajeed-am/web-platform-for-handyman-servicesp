const mongoose = require('mongoose');
const {Schema} = mongoose;
const AdminLogin = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports=mongoose.model('AdminLogin',AdminLogin);