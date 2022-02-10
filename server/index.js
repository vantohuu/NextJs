require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const R_account = require('./routes/account')
const R_contact = require('./routes/contact')
const R_project = require('./routes/product')
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
app.use('/api/products', R_project);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})