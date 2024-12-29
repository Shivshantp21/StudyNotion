
// const {instance} = require('../config/razorpay');
// const Course = require('../models/Course');
// const User = require('../models/User');
// const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
// const mailSender = require('../utils/mailSender');
// const { default: mongoose } = require("mongoose");


// exports.capturePayment = async(req,res)=>{
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     if(!course_id){
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     }

//     let course; //change inside
//     try{
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             })
//         }

//         const uid = new mongoose.Types.ObjectId(userId);

//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:'User already enrolled to the course',
//             })
//         }
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:err.message,
//         })
//     }

//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId
//         }
//     }

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     }catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
// }

// exports.verifySignature = async(req,res)=>{
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac('sha256',webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest('hex');

//     if(signature === digest){
//         console.log("Payment Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {
//                     $push:{
//                         studentsEnrolled:userId,
//                     }
//                 },{new:true}
//             )
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Could not find the course"
//                 })
//             }
//             console.log(enrolledCourse);
//             const gh = await User

//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {
//                     $push:{
//                         courses:courseId,
//                     }
//                 },{new:true}
//             )
//             console.log(enrolledStudent);

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from CodeHelp",
//                 "Congratulations, you are onboarded into new CodeHelp Course",
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added"
//             })
//         }catch(err){
//             console.log(err);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }

//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }
// }


const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const  mongoose  = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress")

//initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const options = {
        amount: totalAmount * 100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ success: false, message: "Could not initiate order." })
      }

}


//verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseID: courseId,
            userId: userId,
            completedVideos: [],
          })
          // Find the student and add the course to their list of enrolled courses
          const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
              $push: {
                courses: courseId,
                courseProgress: courseProgress._id,
              },
            },
            { new: true }
          )
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(
              enrolledCourse.courseName,
              `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
            )
          )
    
          console.log("Email sent successfully: ", emailResponse.response)
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


