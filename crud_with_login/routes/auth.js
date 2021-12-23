const router = require('express')()
const controller = require('../controllers/auth')

router.post('/signup', controller.signUp);
router.post('/login', controller.login);

module.exports = router