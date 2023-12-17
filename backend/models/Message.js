const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    patientSender: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    pharmacistSender: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacist" },
    doctorSender: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;