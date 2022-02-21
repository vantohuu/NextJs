const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Prize = new Schema({
    id : {type : Number},
    option: { type: String},
    value: { type: Number },
    chance: { type: Number },}
)
module.exports = mongoose.model('prize', Prize)