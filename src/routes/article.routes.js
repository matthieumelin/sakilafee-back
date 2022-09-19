const express = require('express');
const router = express.Router();
const controller = require('../controllers/article.controller');

const auth = require('../middlewares/auth.middleware');

router.get('/', auth, controller.fetch);
router.post('/create', auth, controller.create);
router.put('/update', auth, controller.update);
router.delete('/delete', auth, controller.delete);

module.exports = router;