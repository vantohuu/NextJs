const express = require("express");
const router = express.Router();
const UserPrize = require('../models/user-prize')

router.get('/', async(req, res) => {
    try {
        let {phone} = req.body;
        const user_prize = await UserPrize.find({'phone' : phone});
        res.status(200).json(user_prize);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    } 
})

module.exports = router