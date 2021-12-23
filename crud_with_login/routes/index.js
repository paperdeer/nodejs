const router = require('express')()
const auth = require('./auth');
const post = require('./post')
const read = require('./read')
const update = require('./update');;
const Delete = require('./delete');

router.use("/auth", auth);
router.use("/post", post);
router.use("/user", read, update, Delete);

module.exports = router;