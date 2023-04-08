const nodemailer = require("nodemailer");
const { SERVICE, USER, PASS } = require("../config");

const sendEmail=async(email, subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
         
            service: SERVICE,
            
            auth:{
                user: USER,
                pass: PASS
            }
        })

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log('Email sent successfully ');
    }catch(error){
        console.log(`Email not sent ${error}`);
    }
}

module.exports = {sendEmail
  };