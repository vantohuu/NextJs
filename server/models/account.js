const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    content: { type: String},
    id: { type: String },
    img: { type: String },
    tt: { type: String },
})
module.exports = mongoose.model('account', Account)