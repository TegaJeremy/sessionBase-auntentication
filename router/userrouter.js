const express = require('express')
const router = express.Router();
const authController = require('../controller/userController')


router.post('/signup',  authController.signup);
router.post('/signin',  authController.signIn);
router.get('/signout',  authController.signout);
router.get('/allusers', authController.getAll )



module.exports = router;







