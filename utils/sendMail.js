const nodemailer = require("nodemailer")

    const transporter=nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth:{
            user: "d1a3cb99c540da",
            pass: "5654cfc63a4693"
        }
    });
    const sendEmail=async(to,subject,html)=>{
        const mailOption={
            from:"noreply@gmail.com",
            to,
            subject,
            html
        }
        try{
            await transporter.sendMail(mailOption)
            console.log("mail sent successfully")
        }catch(err){
            console.error("error sending email",err)
        }
        
    }

module.exports={sendEmail}