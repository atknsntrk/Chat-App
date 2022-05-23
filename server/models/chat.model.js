const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    text: {
        type: "String",
        required: true,
    } ,
    user: {
        type: "String",
        required: true,
    },
    channel: {
        type: "String",
        required: true,
    }
}, {timestamps: true})

const Message = mongoose.model("message", MessageSchema)

module.exports = Message