// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    matno: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    faculty: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone_no: {
        type: String,
        required: true,
        match: [/^\d{10,15}$/, 'Please enter a valid phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   
}, {
    timestamps: true
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
});

// Static method for login
userSchema.statics.login = async function(email, password) {
    console.log(`Attempting login with email: ${email}`);
    const userExis = await this.findOne({ email });
    if (userExis) {
        console.log(`User found: ${userExis.email}`);
        const ispswMatch = await bcrypt.compare(password, userExis.password);
        if (!ispswMatch) {
            console.log('Password mismatch');
            throw new Error("Invalid password or email");
        }
        return userExis;
    }
    console.log('User not found');
    throw new Error("User not found");
}

const User = mongoose.model('User', userSchema);
module.exports = User;
