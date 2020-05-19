const router = require('express').Router();
const Medicine = require('../models/Medicine')

router.get('/', (req, res, next) => {
  // Skip determines where you start
  Medicine.find().skip(1).limit(5).then(meds=>{
    res.status(200).json({ meds });
  })
});

module.exports = router;
