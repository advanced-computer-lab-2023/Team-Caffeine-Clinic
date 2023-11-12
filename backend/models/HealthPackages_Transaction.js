const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthPackages_TransactionSchema = new Schema ({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'transaction',
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
        }

} , {timestamps: true})


module.exports = mongoose.model('HealthPackages_Transaction', HealthPackages_TransactionSchema);