const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
    Name: {
      type: String,
      unique : true,
      required:true
    },
    MedicalUse: {
      type: String,
    },
    Price: {
      type: Number,
      required:true
    },
    Description: {
        type: String,
      },
    Quantity: {
        type: Number,
        required:true
      },
    Reserved: {
        type: Number,
        default: 0
    },
    Returned: {
      type: Number,
      default: 0
    },    
    activeIngredients: {
        type: String,
        required:true
      },
    Sales: {
        type: Number,
        default:0
      },
    Picture: {
          type: String
      }
  }, { timestamps: true });

MedicineSchema.index({'Name': 'text'});

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;