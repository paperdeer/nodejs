const router = require('express')();
const controller = require('../controllers/read')
const { verifyToken } = require('../middlewares/auth');

router.post('/readone', verifyToken, controller.readOne)
router.get('/readall', verifyToken, controller.readAll)

module.exports = router;