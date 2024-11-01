import express from 'express';
import {
    createListing,
    deleteListing,
    updateListing,
    getListing,
    getListings,
} from '../Controller/Listing.Controller.js';
import { verifyToken } from '../Utilities/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.patch('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
