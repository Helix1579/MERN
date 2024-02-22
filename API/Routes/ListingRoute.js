import express from "express";
import { createListing } from "../Controller/Listing.Controller.js";
import { verifyToken } from "../Utilities/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;