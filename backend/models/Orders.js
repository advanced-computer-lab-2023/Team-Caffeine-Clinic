const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    patient: {
        type: String,
        ref:'Patient',
        required: true,
    },
    medicines: {
        type: [{
            medicineid: {
                type: mongoose.Types.ObjectId,
                ref: 'Medicine'
            },
            Name: {
                type: String,
                ref: 'Medicine'
            },
            amount: {
                type: Number
            },
            Sales: {
                type: Number
            },
            stock: {
                type: Number
            },
            Reserved: {
                type: Number
            },
            Returned: {
                type: Number
            }
        }],
        required: true
    },
    status: {
        type: String,
        enum: ['In delivery', 'Pending', 'Cancelled', 'Delivered'],
        default: 'Pending'
    },
    deliveryaddress: {
        type: String
    },
    TotalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = mongoose.model('Orders', ordersSchema);