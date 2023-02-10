import express from "express";
import AuthController from "../controllers/auth.controller";
const authController = new AuthController();
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;