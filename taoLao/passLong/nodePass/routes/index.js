const express = require('express');

const router = express.Router();


// router.get('/', (req, res) => res.send('welcome'));  // tại / gửi welcom
router.get('/', (req, res) => res.render('welcome')); // tìm file welcome
    
module.exports = router;