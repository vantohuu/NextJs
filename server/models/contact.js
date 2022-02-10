const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema({
    key: { type: Number},
    email: { type: String },
    phone: { type: String },
    face: { type: String }
})
module.exports = mongoose.model('contact', Contact)