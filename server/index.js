require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const R_account = require('./routes/account')
const R_contact = require('./routes/contact')
const R_product = require('./routes/product')
const R_prize = require('./routes/prize')
const R_user_prize = require('./routes/user-prize')

const app = express()
const port = 5000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://vantohuu:huu1234567@cluster0.kpme0.mongodb.net/nextjsdb?retryWrites=true&w=majority`)
        //"mongodb+srv://vantohuu:huu1234567@cluster0.kpme0.mongodb.net/nextjsdb?retryWrites=true&w=majority"
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err);
    }
}

connectDB()

app.use('/api/accounts', R_account);
app.use('/api/contacts', R_contact);
app.use('/api/products', R_product);
app.use('/api/prizes', R_prize);
app.use('/api/user-prize', R_user_prize);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})