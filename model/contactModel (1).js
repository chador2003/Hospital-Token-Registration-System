const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true, 'please enter your name']
    },
    email: {
        type: String,
        required:[true, 'Please provide me a email'],
    },
    subject:{
        type:String,
        require: [true, 'please enter your subject']
    },
    message:{
        type:String,
        require: [true, 'please enter your message']
    },
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact;