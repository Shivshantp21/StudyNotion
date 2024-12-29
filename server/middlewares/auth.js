const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");


exports.auth = async(req , res, next) =>{
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                status:false,
                message:"Token is missing"
            })
        }
        
        try{
            const decode = jwt.verify(token,process.env.SECRET);
            console.log(decode);
            req.user = decode
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Token verification failed"
        })
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Student only"
            })

        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User type cant be verified for Student"
        })

    }
}
exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            })
        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User type cant be verified for Instructor"
        })

    }
}
exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User type cant be verified for Admin"
        })

    }
}