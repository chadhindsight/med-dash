const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');

//Since a lot of user specific routes are already here, use this file to do your user related stuff
router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => { 
        req.login(user, function(err,result){
          res.status(201).json(user)
        })
    })
    .catch((err) => { 
      console.log(err)
      res.status(500).json({ err })
    });
});


//return await service.get('/is-logged-in');
router.get('/is-logged-in', (req, res, next) => {  
  res.json(req.user)
})


router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json(user);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

// Edit User Route
router.post('/profile/edit', isAuth, (req, res, next) =>{
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
})

// View Cart
router.post('/profile/cart', isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
})

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(304).json({ msg: 'Log in first' });
}

module.exports = router;
