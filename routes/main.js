const express = require('express');
const router = express.Router();
const path = require('path');





/* requiriendo los contraladores */

const mainController = require('../controllers/mainController');

/* Rutas a los archivos */

router.get('/', mainController.home);
router.get('/FAQ', mainController.FAQ);
router.get('/Nosotros', mainController.Nosotros);
router.get('/Hombre', mainController.Hombre);
router.get('/Mujer', mainController.Mujer);
router.get('/Nenes', mainController.Nenes);
router.get('/Lonuevo', mainController.Lonuevo);
router.get('/Sale', mainController.Sale);
router.get('/indumentaria', mainController.indumentaria);
router.get('/accesorios', mainController.accesorios);
router.get('/calzado', mainController.Calzado);

module.exports = router;