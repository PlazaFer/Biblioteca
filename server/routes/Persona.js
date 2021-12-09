const express = require("express");
const router = express.Router();
const PersonaController = require("../controllers/Persona/PersonaController");


router.get("/api/personas", PersonaController.TraerPersonas);
router.get("/api/personas/:id", PersonaController.PersonaId);

router.post("/api/personas", PersonaController.CrearPersona);

router.put("/api/personas/:id", PersonaController.editarPersona);

router.delete("/api/personas/:id", PersonaController.BorrarPersonas);



module.exports = router;