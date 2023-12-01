const { default: mongoose } = require('mongoose');
const HealthPackage = require('../models/healthPackageModel.js')
const Medicine = require('../models/Medicine.js');
const Pharmacist = require('../models/Pharmacist.js');
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');


const changePassP = async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = req.user;

    user.changePassword(oldPassword, newPassword, function(err){
        if(err){
            return res.status(400).json({mssg: "Something went wrong"})
        }
    })
}

function generateOTP() {
    // Generate a random number between 100000 and 999999
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return otp;
  }

const forgotPassP = async(req, res) => {
    const {email} = req.body
    
    // Verify Valid Mail
    const user = await Pharmacist.findOne({email: email})
    if(!user){
        return res.status(400).json({err: "Email Address is incorrect"})
    }

    const otp = await OTP.findOne({email: email})

    if(!otp){
    const randomOTP = generateOTP();

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'acluser123@hotmail.com',
          pass: 'AMRgames1@',
        },
    });
      
    const verify = new OTP({
        email: email,
        OTP: randomOTP
    })

    await verify.save()

    const mailOptions = {
        from: 'acluser123@hotmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP: ${randomOTP}`, // Replace with the generated OTP
    };
      
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    return res.status(200).json({mssg: "tmam"})
}
else{
    return res.status(400).json({error: "OTP already sent"})

}
}

const verifyOTPP = async(req, res) => {
    const {otp, email} = req.body

    const verify = await OTP.findOne({email: email})

    if(verify.OTP != otp){
        console.log("Wrong OTP");
        return res.status(400).json({mssg: "Wrong OTP"})
    }

    //console.log("tmam");
    // If OTP is correct, you can allow the user to set a new password
    return res.status(200).json({ mssg: "OTP verified successfully" });
}

const setPassP = async(req, res) => {
    const {newPassword, email} = req.body

    const user = await Pharmacist.findOne({email: email});

    const passwordRequirements = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;

    if (!passwordRequirements.test(newPassword)) {
      console.log("ah yany")
      return res.status(400).json({ error: 'Password must contain at least one capital letter and one number.' });
    } 
    else
    if((newPassword).length<6){
      return res.status(400).json({ error: 'Password length must be at least 6' });
    }
    else
     {

    try{
        Pharmacist.setPassword(email, newPassword,res)
        // return res.status(200).json({ mssg: "Password Changed Successfully" });
    } catch(error){
        // return res.status(400).json({error: error})
    }
}
}

module.exports = {
     changePassP,
     setPassP,
     forgotPassP,
      verifyOTPP
}