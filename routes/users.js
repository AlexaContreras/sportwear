var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const autenticarMiddleware = require('../middlewares/autenticarMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware');
/* Usanado multer para almacenar imagenes */

const storageDiskUser = multer.diskStorage({
	destination: (req, file, cb) => {
        cb(null, __dirname + '/../public/images/avatarsUsers');
        
	},
	filename: (req, file, cb) => {
		let imageFinalName = `user_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const uploadUser = multer({ storage: storageDiskUser });


router.get('/register', guestMiddleware, userController.register);
router.post('/register',uploadUser.single('avatar') ,userController.registerStore);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.procesarLogin);
router.get('/profile',autenticarMiddleware ,userController.profile);
router.get('/logout', userController.logout);

module.exports = router;
