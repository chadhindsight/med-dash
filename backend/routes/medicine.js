const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine')


// Seach for meds
router.get('/medicine/search', (req, res, next) => {
    Medicine.find({
        name: { $regex: `[${req.body.name}]`, $options: "gi" }

    }).then(n => {
        res.json({ n })
    })
})

// Select meds
router.get('/medicine/:id', (req, res) =>{
    Medicine.findById(req.params.id).then(medicine=>{
        res.json({ medicine })
    })
})

module.exports = router;