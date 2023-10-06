const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  servicesIncluded: [String],
  basePrice: {
    type: Number,
    required: true,
  },
  discounts: {
    doctorSession: Number, // Percentage discount on doctor's sessions
    pharmacyMedicine: Number, // Percentage discount on pharmacy medicines
    familySubscription: Number, // Percentage discount on family members' subscriptions
  },
});

const HealthPackage = mongoose.model('HealthPackage', healthPackageSchema);
module.exports = HealthPackage;