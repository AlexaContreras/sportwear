const express = require('express');
const router = express.Router();
const path = require('path');





/* requiriendo los contraladores */

const mainController = require('../controllers/mainController');

/* Rutas a los archivos */

router.get('/', mainController.home);
router.get('/FAQ', mainController.FAQ);
router.get('/Nosotros', mainController.Nosotros);

module.exports = router;