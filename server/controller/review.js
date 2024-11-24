const Review = require('../model/review');
const AddReview=async(req,res)=>{
    try{
       
        const {review,worker_id}=req.body
       console.log(req.body)
        const RequestReview=await Review({reviews:review.reviews,rating:review.rating,user_id:req.admin,worker_id:worker_id})
        const RequestedReview=await RequestReview.save();
        res.json({RequestedReview,success:true})
    }
    catch(err){
        console.log(err)
    }
}
const GetReview=async(req,res)=>{
try{
    const FindReview=await Review.find({worker_id:req.params.id}).populate('user_id');
    res.send(FindReview)
} 
catch(err){
    console.log(err)
}
}
const GetWrokerReview=async(req,res)=>{
try{
    const FindReview=await Review.find({worker_id:req.admin}).populate('user_id');
    res.send(FindReview)
} 
catch(err){
    console.log(err)
}
}
const GetAllReview=async(req,res)=>{
try{
    const FindReview=await Review.find().populate('user_id').populate('worker_id');
    res.send(FindReview)
} 
catch(err){
    console.log(err)
}
}






 module.exports={AddReview,GetReview,GetAllReview,GetWrokerReview}