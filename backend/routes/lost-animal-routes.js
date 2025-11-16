import express from 'express';
import { createAnimal, getAnimals } from '../controllers/lost-animal-controller.js';
const router = express.Router();

router.post('/', createAnimal);
router.get('/', getAnimals);

export default router;


