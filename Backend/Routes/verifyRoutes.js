const express = require('express');
const { getHome } = require('../Controllers/verifyControllers');

const router = express.Router();

router.route('/home').get(getHome);

module.exports = router;