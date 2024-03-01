import express from 'express';
import {
    test,
    updateUser,
    deleteUser,
    getUserListings,
    getUser,
} from '../Controller/User.Controller.js';
import { verifyToken } from '../Utilities/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.patch('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;
