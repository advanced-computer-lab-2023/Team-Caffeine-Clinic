const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctor')
const Patient = require('../models/Patient')

const stripe = require('stripe')('sk_test_51OABYlCDYNw0lbpNxu1DkCMbDPyyLBAwj2EJ1wGlpLcCKV95eL7BcB7TIH5upjy8Ew1eAw1TsValByc3AP0rZYM900LY8pz22o')

const pay = async (req, res) => {
    const {amount} = req.query
    const amountPay = Math.round(amount * 100)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountPay,
        currency: 'usd'
    })

    res.status(200).json({clientSecret: paymentIntent.client_secret})
}

const updateDoctorWallet = async (req, res) => {
    const {amount, doctorUsername} = req.query
    try{
        const doctor = await Doctor.findOne({username: doctorUsername})

        if(!doctor){

        }

        const newDoctorWallet = doctor.wallet + parseInt(amount, 10)

        await Doctor.findByIdAndUpdate(doctor._id, {wallet: newDoctorWallet})

        return res.status(200).json('Wallet Updated')
    } catch(error){
        return res.status(401).json({error: error})
    }
}

const healthPackagePayWithWallet = async (req, res) => {
    const user = req.user
    
    const {amount} = req.query
    
    const newPatientWallet = user.wallet - parseInt(amount, 10)

    try {
        console.log(user._id, 'ana hena');
        await Patient.findByIdAndUpdate(user._id, {wallet: newPatientWallet})
        console.log('works?');
        return res.status(200).json({mssg: 'Successful'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error})
    }
}


module.exports = {
    pay,
    updateDoctorWallet,
    healthPackagePayWithWallet
}
