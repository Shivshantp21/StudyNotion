const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

exports.resetPasswordToken = async (req,res) =>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const token = crypto.randomUUID().toString("hex");

        const updateDetails = await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires: Date.now()+  36000000,
            },{new:true},
        )
        console.log("DETAILS", updateDetails);

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email,
            "Reset Password Link ",
            `Reset Password Link ${url}`,
        )
        return res.status(200).json({
            success:true,
            message:"Link send successfully"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset password  link"
        })
    }
}

exports.resetPassword = async(req,res) =>{
    try{
        const{password,confirmPassword , token} = req.body;
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching'
            })
        }
        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:'User details Not found'
            })
        }
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success:false,
                message:'Token has expired'
            })
        }
        const hashPassword = await bcrypt.hash(password , 10);

        await User.findOneAndUpdate(
            {token:token},{password:hashPassword},{new:true},
        );
        return res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resetting the password',
        })
    }
}