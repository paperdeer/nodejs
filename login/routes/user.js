const router = require('express')();
const controller = require('../controllers/user');
const { verifyToken } = require('./middlewares');
router.post('/signup', controller.sign_up);
router.post('/login', controller.login);
router.post('/test', verifyToken, controller.test);

module.exports = router;