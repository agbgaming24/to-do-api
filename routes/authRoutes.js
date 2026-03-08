import express from 'express'
import * as authController from '../controller/authController.js' 
import { validateSignup, validateLogin } from '../validators/validator.js'
import { validate } from '../middleware/validate.js';

const router=express.Router();

router.post("/signup",validateSignup,validate,authController.signup)
router.post('/login',validateLogin,validate,authController.login)

export default router;