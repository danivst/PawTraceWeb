import express from 'express';
import { createAnimal, getAnimals } from '../controllers/found-animal-controller.js';
const router = express.Router();

router.post('/', createAnimal);
router.get('/', getAnimals);

export default router;


