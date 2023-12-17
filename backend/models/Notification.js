const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },


}, {timestamps: true})

module.exports = mongoose.model('Notification',notificationSchema);