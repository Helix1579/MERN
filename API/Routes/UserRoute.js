import express from "express";
import { test } from "../Controller/User.Controller.js";

const router = express.Router();

router.get("/test", test);

export default router;