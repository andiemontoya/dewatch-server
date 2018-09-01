const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller');

router.post('/create/:userId', exerciseController.create);   
router.get('/:userId', exerciseController.getAll); 
router.get('/id/:exerciseId', exerciseController.get);

module.exports = router; 