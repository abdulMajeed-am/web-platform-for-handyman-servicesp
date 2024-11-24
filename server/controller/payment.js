const Payment = require('../model/payment');
const AddPayment=async(req,res)=>{
    try{
       
        const {transaction_id,service_id,worker_id,service_charge,total,booking_id}=req.body
      
        const adminpay=total*5/100;
       
        
        const AddPayment=await Payment({transaction_id:transaction_id,service_id:service_id,worker_id:worker_id,user_id:req.admin,admin_pay:adminpay,total:total,booking_id:booking_id})
        const AddedPayment=await AddPayment.save();
        res.json({AddedPayment,success:true})
    }
    catch(err){
        console.log(err)
    }
}
const GetPayment=async(req,res)=>{
    try{
        const FindPayment=await Payment.find({worker_id:req.admin}).populate('service_id').populate('user_id');
        res.send(FindPayment)
    } 
    catch(err){
        console.log(err)
    }
    }
const GetAllPayment=async(req,res)=>{
    try{
        const FindPayment=await Payment.find().populate('service_id').populate('user_id').populate('worker_id');
        res.send(FindPayment)
    } 
    catch(err){
        console.log(err)
    }
    }
const GetUserPayment=async(req,res)=>{
    try{
        const FindPayment=await Payment.find({'user_id':req.admin}).populate('service_id').populate('user_id').populate('worker_id');
        res.send(FindPayment)
    } 
    catch(err){
        console.log(err)
    }
    }


 module.exports={AddPayment,GetPayment,GetAllPayment,GetUserPayment}