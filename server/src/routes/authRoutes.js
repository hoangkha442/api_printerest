import express from 'express';
import { login, sigup } from '../controllers/authController.js';
const authRoute = express.Router();

authRoute.post('/login', login)
authRoute.post('/sigup', sigup)
export default authRoute
