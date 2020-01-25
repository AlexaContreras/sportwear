var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const autenticarMiddleware = require('../middlewares/autenticarMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware');
const { check, validationResult , body } = require('express-validator');




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
router.post('/register',uploadUser.single('avatar') , [

	check('first_name').isLength({min:1}).withMessage('El primer campo debe contener tu nombre'),
	check('last_name').isLength({min:1}).withMessage('El segundo campo debe contener tu apellido'),
	check('city').isLength({min:1}).withMessage('El quinto campo debe contener la cuidad de tu residencia'),
	check('email').isEmail().withMessage('El email debe tener un formato valido'),
	check('password').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 carácteres')
	
],userController.registerStore);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.procesarLogin);
router.get('/profile',autenticarMiddleware ,userController.profile);
router.get('/logout', userController.logout);

module.exports = router;
