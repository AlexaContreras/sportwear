const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


/* Usando multer para almacenar imagenes */
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/avatars');

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
router.get('/detail/:id', productController.productDetail);
router.get('/cart', productController.productCart);
router.post('/cart', productController.addProductCart);
router.delete('/cart/delete/:id', productController.deleteProductCart);
router.get('/add', productController.productShow);
router.post('/add', upload.single('avatar'),productController.productAdd);
router.get('/edit/:id', productController.editProductShow);
router.put('/edit/:id', upload.single('avatar'), productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/men', productController.men);
router.get('/women', productController.women);
router.get('/kids', productController.kids);
router.get('/new', productController.new);
router.get('/sale', productController.sale);
router.get('/clothes', productController.clothes);
router.get('/accesories', productController.accesories);
router.get('/shoes', productController.shoes);



module.exports = router;