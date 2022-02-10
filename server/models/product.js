const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    title: { type: String},
    des: { type: String },
    lang: { type: String },
    tools: { type: String },
})
module.exports = mongoose.model('product', Product)