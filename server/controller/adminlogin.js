const AdminLogin = require('../model/adminlogin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key="Hello"
const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await AdminLogin.findOne({email})
         if(!user){
            return res.json('Email Not Found')
         }
         const ismatch=await bcrypt.compare(password,user.password)
         if (!ismatch) {
      const success = false;
      return res.json({ massege: "Incorrect Password", success });
    }
         const data=user.id
         const token=await jwt.sign(data,key)
         const success=true;
         res.json({token,success})
    }
    catch(err){
        console.log(err)
    }
    
}
module.exports=Login;