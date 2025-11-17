import { LostAnimal } from '../models/lost-animal.js';

export const createLostAnimal = async (req, res) => {
  try {
    const id = await LostAnimal.create(req.body);
    res.status(201).json({ message: 'Animal added', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimals = async (req, res) => {
  const { status, type, location, date } = req.query;
  try {
    const animals = await LostAnimal.findByFilters({ status, type, location, date });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLostAnimalById = async (req, res) => {
  try {
    const id = req.params.id;
    const animals = await LostAnimal.findByFilters({ id });
    const animal = animals[0];

    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLostAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await LostAnimal.update(id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Animal not found' });

    res.json({ message: 'Animal updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLostAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await LostAnimal.delete(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Animal not found' });

    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};