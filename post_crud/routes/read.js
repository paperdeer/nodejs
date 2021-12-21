const router = require('express')();
const controller = require('../controllers/read');

router.post("/readone", controller.readOnePost);
router.post("/readwirterposts", controller.readAllWirterPosts)
router.get("/readall", controller.ReadAllPosts)

module.exports = router;