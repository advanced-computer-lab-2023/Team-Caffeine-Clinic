const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthPackages_TransactionSchema = new Schema ({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transaction',
        default:""
    },

    patient: {
        type: String, 
        ref: 'Patient', 
        required: true,
    },

    healthPackage:{
        type: String,
        ref:'healthPackageModel'
    },

    state: {
        type: String,
        enum: ['cancelled', 'subscribed', 'unsubscribed'],
        default: 'subscribed'
    },

    cancel_renewal_time:{
        type: Date
    }

} , {timestamps: true})


module.exports = mongoose.model('HealthPackages_Transaction', HealthPackages_TransactionSchema);