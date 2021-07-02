const express = require('express');
const authController = require('../controllers/auth.controller.js')
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/register',authController.register)
router.post('/signin',authController.signin)
router.get('/isauth',auth(),authController.isAuth)





module.exports = router;