import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const id = await User.create(req.body);
    res.status(201).json({ message: 'User created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const user = await User.findByEmail(req.body.email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(403).json({ error: 'Wrong password' });

  const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey');
  res.json({ message: 'Login successful', token });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    let hashedPassword = null;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await User.update(id, { name, email, phone, password: hashedPassword });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await User.delete(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};