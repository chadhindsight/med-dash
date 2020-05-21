const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine')
const User = require('../models/User')

// Search for med & check if it is prescribed to the user currently logged in.
router.get('/medicine/search/:name', isAuth, (req, res, next) => {
    // console.log(req.user)

    Medicine.findOne({
         'drugName': { '$regex': req.params.name, '$options': 'i' } 
    }).then(med => {
        // Check if the id of med matches any ids prescribed to this specific user
        User.find({medications:[med._id]}).then(x => res.json({med}))
    }).catch(err => console.log('Medication not found!'))
})

// Place an order, cancel, or change/reschedule delivery
router.post('/medicine/order/:med', isAuth, (req,res, next)=>{
    console.log(req.params.med)
    // Find user document by id and update the order array of that user document
    // User.findByIdAndUpdate({ _id: req.user._id }, { order: [res.data.med] })
    User.findById({ _id: req.user._id }).then(med => res.json())
})


function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(304).json({ msg: 'Log in first' });
}

module.exports = router;