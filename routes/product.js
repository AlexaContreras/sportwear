const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/* Usanado multer para almacenar imagenes */

const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/avatars');

	},
	filename: (req, file, cb) => {
		let imageFinalName = `product_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const upload = multer({
	storage: storageDisk
});




/* requiriendo los contraladores */

const productController = require('../controllers/productController');

/* Rutas a los archivos */


router.get('/productDetail/:id', productController.productDetail);
router.get('/productCart', productController.productCart);
router.get('/productAdd', productController.productShow);
router.post('/productAdd', upload.single('avatar'), productController.productAdd);
router.get('/productEdit/:id', productController.editProductShow);
router.put('/productEdit/:id', upload.single('avatar'), productController.editProduct);
router.delete('/productos/borrar/:id', productController.deleteProduct);


module.exports = router;