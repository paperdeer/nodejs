const router = require('express')();
const controller = require('../controllers/post')
const { verifyToken } = require('../middlewares/auth');

router.post('/upload', verifyToken, controller.creatPost)

module.exports = router