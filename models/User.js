const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    address: {
        type: String,
        required: [true, 'Please provide address'],
        minlength: 3,
        maxlength: 50,
    },
    city: {
        type: String,
        required: [true, 'Please provide city'],
    },
    country: {
        type: String,
        required: [true, 'Please provide country'],
    },
    pincode: {
        type: Number,
        required: [true, 'Please provide pincode'],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    otp: Number,
    otp_expire: Date,
})

UserSchema.pre('save', async function (next) {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePasscode = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
