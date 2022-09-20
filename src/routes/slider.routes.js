const express = require('express');
const router = express.Router();
const controller = require('../controllers/slider.controller');

router.get('/', controller.findAll);
router.post('/create', controller.create);
router.put('/update', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;