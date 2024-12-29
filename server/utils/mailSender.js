const nodemailer = require('nodemailer');

const mailSender = async(email , title , body ) =>{

    try{
        let transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodHelp - by Babbar',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info)
        return info
    }
    catch(err){
        console.log(err.message)
    }

}
module.exports = mailSender;