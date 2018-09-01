const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// a simple test url to check that all of our files are communicating correctly
router.get('/test', userController.test); 

//acutal routes
router.post('/create', userController.create);  
//router.get('/login/:username', userController.login); 
//router.put('/update/:username', userController.update); 

module.exports = router; 



