const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/Libros/LibrosController');

router.get("/api/libros", LibrosController.TraerLibros);
router.get("/api/libros/:id", LibrosController.librosId);

router.post("/api/libros", LibrosController.CrearLibro);

router.put("/api/libros/:id", LibrosController.EditarLibro);
router.put("/api/libros/prestar/:id", LibrosController.PrestarLibro);
router.put("/api/libros/devolver/:id", LibrosController.devolverLibro);


router.delete("/api/libros/:id", LibrosController.BorrarLibro);


module.exports = router;