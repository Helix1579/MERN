import express from "express";
import { test, updateUser } from "../Controller/User.Controller.js";
import { verifyToken } from "../Utilities/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/update/:id",verifyToken ,updateUser);

export default router;