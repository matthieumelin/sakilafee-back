const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');

const auth = require('../middlewares/auth.middleware');

router.get('/', auth, controller.findAll);
router.get('/categories', controller.findAllCategories);
router.post('/create', auth, controller.create);
router.put('/update', auth, controller.update);
router.delete('/delete', auth, controller.delete);

module.exports = router;