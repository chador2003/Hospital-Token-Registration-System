const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    date: {
        type: String,
        required:[true, 'the date is required']
    },
    departmentR: {
        type:String,
        required:[true,'the department is required']
    },
    username: {
        type: String
    },
    cid: {
        type:String
    },
    phoneno: {
        type: Number
    },
    checkUpdate: {
        type: String,
        default:'No'
    }


})

const Token = mongoose.model('Token', tokenSchema)
module.exports = Token;