const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please tel us your name!']
    },
    email: {
        type: String,
        required:[true, 'Please provide me a email'],
        unique: [true,'the email already exists!!']
    },
    cidNumber: {
        type:String,
        required: [true, 'Please provide a cid number'],
        unique: [true,'the cid number already exists']
        // validate: {
        //     validator: function(value){
        //         return /^\d{11}$/.test(value)
        //     },
        //     message:'cid number should be numeric and exactly 11 digits'
        // }
    },
    password:{
        type: String,
        required:[true, 'Please provide a password'],
        // minlength: 8,
        // select:false,
    },
    passwordConfirm: {
        type:String,
        required: [true, 'please confirm your password'],
        // validate: {
        //     validator: function (el) {
        //         return el === this.password
        //     },
        //     message: 'password are not the same'
        // }
    },
    role: {
        type: String,
        enum:['user', 'admin', 'doctor'],
        default: 'user'
    },
    active:{
        type:Boolean,
        default:true,
        select:false,
    },
    contactNumber:{
        type : Number,
        unique: false,
    }
    
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field
    this.passwordConfirm = undefined 
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm){

            // hash the password with cost of 12
            this.getUpdate().password = await bcrypt.hash(update.password, 12)

            // Delete passwordConfirm field
            update.passwordConfirm = undefined
            next()
        }else
        next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema);
module.exports = User;
