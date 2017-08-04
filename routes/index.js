const express = require('express');
const router = express.Router();
const testController = require('../controllers/testing');

router.get('/', testController.homepage)

module.exports = router;
