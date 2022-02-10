const express = require('express')
const router = express.Router()
const Account = require('../models/account')
   
router.get('/', async(req, res) => {
    try {
        const accounts = await Account.find({});
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    }
})

module.exports = router