const express = require("express");
const router = express.Router();
const Prize = require('../models/prize')
const ObjectId = require('mongodb').ObjectId;

router.get('/', async(req, res) => {
    try {
        const prize = await Prize.find({});
        res.status(200).json(prize);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Wrong!' })
    }
})

router.post('/post', async(req, res) => {
    const {id, option, value, chance} = req.body
    try {
        const newPrize = new Prize({ id, option, value, chance})
        await newPrize.save()
        res.status(200).json({ success: true, message: 'Added' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Wrong add' })
    }
  })
  
  
  router.put('/put', async(req, res) => {
    let oj = req.body;
    console.log(oj);
    try {
       await Prize.updateOne(
          {
              _id: new ObjectId(oj._id),
          }, 
          { $set: { id : oj.id, option: oj.option, value: oj.value, chance : oj.chance }},
      );
        return res.status(200).json({ success: true, message: 'Updated' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: 'Wrong Update' })
    }
  })
  
  
  router.delete('/delete', async(req, res) => {
    const prize = req.body;
    console.log(prize)
    const id = prize.id;
    try {
        const deletePrize = await Prize.deleteOne({ _id: new ObjectId(id)})
        return res.status(200).json({ success: true, message: 'Deleted', deletePrize })
    } catch (error) {
        console.log(error)
    return res.status(400).json({ success: false, message: 'Wrong Delete' })
   }
  })
module.exports = router