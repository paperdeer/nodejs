const router = require('express')();
const controller = require('../controllers/update');
const { verifyToken } = require('../middlewares/auth');

router.post('/update', verifyToken, controller.update)

module.exports = router