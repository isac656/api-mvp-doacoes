const express = require("express");
const router = express.Router();
const controller = require("../controllers/institutionController");
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", controller.list);

module.exports = router;
