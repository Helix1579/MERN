import express from "express";
import { createListing, deleteListing } from "../Controller/Listing.Controller.js";
import { verifyToken } from "../Utilities/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;