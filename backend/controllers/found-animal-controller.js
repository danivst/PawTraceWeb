import { FoundAnimal } from '../models/found-animal.js';

export const createFoundAnimal = async (req, res) => {
  try {
    const id = await FoundAnimal.create(req.body);
    res.status(201).json({ message: 'Animal added', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimals = async (req, res) => {
  const { status, type, location, date } = req.query;
  try {
    const animals = await FoundAnimal.findByFilters({ status, type, location, date });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFoundAnimalById = async (req, res) => {
  try {
    const id = req.params.id;
    const animals = await FoundAnimal.findByFilters({ id });
    const animal = animals[0];

    if (!animal) return res.status(404).json({ error: 'Animal not found' });

    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFoundAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await FoundAnimal.update(id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Animal not found' });

    res.json({ message: 'Animal updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFoundAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await FoundAnimal.delete(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Animal not found' });

    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};