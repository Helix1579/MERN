import express from 'express'
import { signup } from "../Controller/Auth.Controller.js"

const router = express.Router();

router.post('/signup', signup)

export default router;