const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true
    },
    health_package: {
        type: String,
        default: 'Unsubscribed'
    },
    health_records: [
        {
            type: String,
            default: []
        }
    ],
    emergency_contact: {
        full_name: {
            type: String,
            required: true
        },
        mobile_number: {
            type: String,
            required: true
        },
        relation_to_the_patient: {
            type: String,
            required: true,
            enum: ['Wife', 'Husband', 'Child', "Father", "Mother", "Sibling"]
        }
    },
    family_members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'
    }],
    relation: [{
        type: String,
        enum: ["Wife", "Husband", "Daughter", "Father", "Mother", "Sibling", "Son"]
    }],
    wallet: {
        type: Number,
        default: 0
    },
    Documents: [
        {
            description: {
                type: String,
                unique: true
            },
            content: {
                type: String,
            },
        }
    ],
    cart: {
        type: [{
            medicineid: {
                type: mongoose.Types.ObjectId,
                ref: 'Medicine'
            },
            amount: {
                type: Number,
                default: 1
            }
        }],
        default: []
    },
    deliveryaddresses: {
        type: [String],
        default: []
    },
    orders: {
        type: [{
            medicines: {
                type: [{
                    medicineid: {
                        type: mongoose.Types.ObjectId,
                        ref: 'Medicine'
                    },
                    amount: {
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
            }
        }],
        default: []
    }
}, { timestamps: true });


//patientSchema.plugin(passportLocalMongoose)

// static signUp 
patientSchema.statics.signUp = async function(patient) {
    const { username, email, password } = patient;

    const usernameExists = await this.findOne({ username });
    const emailExists = await this.findOne({ email });

    if (usernameExists || emailExists) {
        throw Error('Username or email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = { ...patient, password: hash };
    return await this.create(newUser);
};


patientSchema.statics.login = async function(username, password) {
    console.log(username, password);
    if(!username | !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username: username })
    
    if(!user){
        throw Error('Incorrect Username')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

patientSchema.statics.setPassword = async function(email, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    const updatedUser = await this.findOneAndUpdate({ email }, { password: hash }, { new: true });

    if (!updatedUser) {
        throw Error('User Not Found');
    }

    return updatedUser;
};


module.exports = mongoose.model('Patient', patientSchema)