const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/agendamentoController");

router.post("/", auth, controller.create);
router.get("/", controller.list);
router.delete("/:id", auth, controller.delete);

module.exports = router;
