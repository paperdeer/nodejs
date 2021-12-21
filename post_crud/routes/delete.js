const router = require('express')();
const controller = require("../controllers/delete");

router.get("/deleteall", controller.deleteAll);
router.post("/delete", controller.deleteOne);

module.exports = router;