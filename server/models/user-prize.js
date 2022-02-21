const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String},
    email: { type: String },
    phone: { type: String },
    list: { type: Array },  
},
{
    timestamps : true,
}
)
module.exports = mongoose.model('user', User)