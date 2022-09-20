const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/forgot', controller.forgot);
// router.get('/verify/:token', controller.verify);

module.exports = router;