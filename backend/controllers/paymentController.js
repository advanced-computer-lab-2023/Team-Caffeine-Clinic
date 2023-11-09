const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

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


module.exports = {
    pay
}
