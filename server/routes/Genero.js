const express = require("express");
const router = express.Router();
const GeneroController = require("../controllers/Genero/GeneroController");

router.get("/api/categorias", GeneroController.TraerGeneros);
router.get("/api/categorias/:id", GeneroController.GenerosId);

router.post("/api/categorias", GeneroController.CrearGenero);

router.delete("/api/categorias/:id", GeneroController.EliminarGenero);


module.exports = router;