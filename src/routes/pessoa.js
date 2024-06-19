const express = require("express");
const ControllerExercicio = require("../controllers/pessoa.js");

const router = express.Router();

const controllers = new ControllerExercicio()

router.get("/api/pessoas/", controllers.PegarTodos);
router.get("/api/pessoa/:id", controllers.PegarUm);
router.post("/api/pessoa", controllers.Adicionar);
router.put("/api/pessoa/:id", controllers.Alterar);
router.delete("/api/pessoa/:id", controllers.Deletar);

module.exports = router;
