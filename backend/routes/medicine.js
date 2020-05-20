const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine')
const User = require('../models/User')

// Search for med & check if it is prescribed to the user currently logged in.
router.get('/medicine/search/:name', isAuth, (req, res, next) => {
    console.log(req.user)

    Medicine.findOne({
         'drugName': { '$regex': req.params.name, '$options': 'i' } 
    }).then(med => {
        // Check if the id of med matches any ids prescribed to this specific user
        // console.log(med)
        User.find({medications:[med._id]}).then(x => res.json({med}))
    }).catch(err => console.log('Medication not found!'))
})

// Add to cart, Place your order, schedule delivery and update User orders in db


function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(304).json({ msg: 'Log in first' });
}
// User.findByIdAndUpdate when order has been placed
module.exports = router;