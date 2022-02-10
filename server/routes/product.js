const express = require("express");
const router = express.Router();
const Product = require('../models/product')

router.get('/', async(req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    }
})

module.exports = router