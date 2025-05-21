const mongoose = require('mongoose')

const dtokenSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'the user name is required for update']
    },
    phoneno: {
        type:Number,
        required:[true, 'patient contact is required']
    },
    department: {
        type: String
    },
    date: {
        type: String
    },
    checkUpdate: {
        type:String
    }
})

const Updatetoken = mongoose.model('updatetoken', dtokenSchema)
module.exports = Updatetoken;