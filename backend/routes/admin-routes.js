import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, getStats } from '../controllers/admin-controller.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

export default router;