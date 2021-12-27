const router = require('express')()
const controller = require('../controllers/auth')

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
router.post('/reissue', controller.refreshToken);

module.exports = router