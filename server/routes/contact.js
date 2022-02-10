const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
var bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;

// localhost:5000

router.get('/get', async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.status(200).json(contact)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: 'Wrong get' })
  }
});

router.post('/post', async(req, res) => {
  const {key, email, phone, face} = req.body
  try {
      const newContact = new Contact({ key, email, phone, face})
      await newContact.save()
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
     await Contact.updateOne(
        {
            _id: new ObjectId(oj._id),
        }, 
        { $set: { key : oj.key, email: oj.email, phone: oj.phone, face : oj.face }},
    );
      return res.status(200).json({ success: true, message: 'Updated' })
  } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: 'Wrong Update' })
  }
})


router.delete('/delete', async(req, res) => {
  const contact = req.body;
  console.log(contact)
  const id = contact.id;
  try {
      const deleteContact = await Contact.deleteOne({ _id: new ObjectId(id)})
      return res.status(200).json({ success: true, message: 'Delete Project completed !', deleteContact })
  } catch (error) {
      console.log(error)
  return res.status(400).json({ success: false, message: 'Fallure Delete !' })
 }
})
module.exports = router;