const Otp = require('../models/Otp');
const Profile = require('../models/Profile');
const User = require('../models/User');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require('dotenv').config();


exports.sendotp = async(req,res) =>{
    try{

        const {email} = req.body;
        console.log("SendOtp email ", email)

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        
        const result = await Otp.findOne({otp:otp});
        console.log("otp generated" , otp);
        console.log("Result" , result);

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            })
        }

        const otpPayload = {email, otp};

        const otpBody = await Otp.create(otpPayload);
        console.log("OTP Body",otpBody);

        res.status(200).json({
            success:true,
            message:"Otp Sent successfully",
            otp,
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Otp cannot be sent"
        })
    };
}

exports.signup = async(req,res) =>{
    try{

        const{firstName, lastName , email, password, confirmPassword, otp, contactNumber, accountType} = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp  || !accountType){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields carefully",
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists, Please SignIn"
            })
        }
        // console.log("in signup exist user" , existingUser );

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password",
            })
        }

        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log("in signup recentotp" ,recentOtp);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"Otp is not valid hello"
            })
        }
        else if( otp !== recentOtp[0].otp ){
            return res.status(400).json({
                success:false,
                message:"Otp expired"
            }) 
        }
        console.log('Recent OTP:', recentOtp);


        const hashPassword = await bcrypt.hash(password ,10);

        let approved = "";
		    approved === "Instructor" ? (approved = false) : (approved = true);

        const profileDetails = await Profile.create({
            gender:null,
            dob:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName , 
            email,
            password:hashPassword, 
            contactNumber, 
            accountType:accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user,
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User Cant be registered",
            err:err.message,
        })
    }
}

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found",
            })
        }
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Please fill all the details",
            })
        };
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {
                    email:user.email,
                    id:user._id,
                    accountType:user.accountType,
                }
                , process.env.SECRET,{
                expiresIn:'2h',
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            
            res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Login Failed",
            err:err.message
        })
    }
}

exports.changePassword = async(req,res) =>{

    try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}



}


