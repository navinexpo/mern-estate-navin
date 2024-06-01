import express from 'express'
import { deleteUser, getUserListings, test, updateUser, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verify.user.js';

const router = express.Router();

//crete test api route here

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)


export default router;

//before going to update the user, we have to check the user whether he/she is authorize or not.   