const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  servicesIncluded: {
    type: String
  },
  basePrice: {
    type: Number,
    required: true,
  },
  discounts: {
    doctorSession: {
      type: Number,
      // required: true,
    },
    pharmacyMedicine: {
      type: Number,
      // required: true,
    },
    familySubscription: {
      type: Number,
      // required: true,
    }
  }
});

const HealthPackage = mongoose.model('HealthPackage', healthPackageSchema);
module.exports = HealthPackage;