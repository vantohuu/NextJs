const express = require("express");
const router = express.Router();
const UserPrize = require('../models/user-prize')

router.get('/', async(req, res) => {
    try {
        const user_prize = await UserPrize.find({});
        res.status(200).json(user_prize);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    }
})

router.post('/post', async(req, res) => {
    const {name, email, phone, list} = req.body
    console.log(req.body);
    try {
        const newUser = new UserPrize({ name, email, phone, list})
        await newUser.save()
        res.status(200).json({ success: true, message: 'Added' })
    } catch(error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    }
});


module.exports = router