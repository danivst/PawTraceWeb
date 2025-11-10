import { db } from '../config/db.js';

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute(
      `SELECT id, name, email, phone, role FROM users ORDER BY id DESC`
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await db.execute(`DELETE FROM users WHERE id=?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM animals WHERE status='lost') AS lost,
        (SELECT COUNT(*) FROM animals WHERE status='found') AS found,
        (SELECT COUNT(*) FROM users) AS total_users
    `);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};