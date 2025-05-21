const mongoose = require('mongoose')

const tokenCustomizeSchema =  new mongoose.Schema({
    date: {
        type:String,
        required:[true, 'the date is required']
    },
    department: {
        type:String,
        required:[true, 'the departement is required']
    },
    noOfToken: {
        type: Number,
        required: [true, 'You need to specify no of token']
    }
})

const CustomizeToken = mongoose.model('CustomizeToken', tokenCustomizeSchema)
module.exports = CustomizeToken