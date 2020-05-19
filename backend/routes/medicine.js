const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine')
const User = require('../models/User')

// Seach for meds
router.get('/medicine/search', (req, res, next) => {
    Medicine.find({
        name: { $regex: `[${req.body.name}]`, $options: "gi" }

    }).then(n => {
        res.json({ n })
    })
})

// Select a specific med
// Place your order, schedule delivery and update User orders in db
router.get('/medicine/:id/order', (req, res) => {
    Medicine.findById(req.params.id).then(medicine => {
        res.json({ medicine })
        // Check if that particular medicine id has been prescribed to User
        let presciptionList = User.find({medications: [medicine]})
    })
})

// User.findByIdAndUpdate when order has been placed
module.exports = router;