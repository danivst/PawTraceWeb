import express from 'express';
import { getAllUsers, deleteUser, getStats } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

export default router;