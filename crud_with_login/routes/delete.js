const router = require('express')();
const controller = require('../controllers/delete');
const { verifyToken } = require("../middlewares/auth")

router.post('/deleteone', verifyToken, controller.deleteOne);
router.get('/deleteall', verifyToken, controller.deleteAll);

module.exports = router