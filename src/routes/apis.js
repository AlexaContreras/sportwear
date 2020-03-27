const express = require('express');
const router = express.Router();

const apisController =  require('../controllers/apisController');

router.get('/users', apisController.users);
router.get('/products', apisController.products);

module.exports = router;