const mongoose = require('mongoose');
const ConnectURI='mongodb://127.0.0.1/Handi-Man'
const ConnectToMongo=async()=>{
    try{
        await mongoose.connect(ConnectURI)
        console.log('Connected to Mongoose Successfully')
    }
    catch(err){
        console.log("Connect To Mongo Unsuccessfull",err)
    }
}
module.exports = ConnectToMongo