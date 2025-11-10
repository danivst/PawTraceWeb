import { db } from '../config/db.js';
import bcrypt from 'bcrypt';

export class User {
  static async create({ name, email, phone, password, role = 'user' }) {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      `INSERT INTO users (name, email, phone, password, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, hashed, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(`SELECT * FROM users WHERE email=?`, [email]);
    return rows[0];
  }

  static async update(id, { name, email, phone, password }) {
    const fields = [];
    const values = [];

    if (name) { fields.push('name=?'); values.push(name); }
    if (email) { fields.push('email=?'); values.push(email); }
    if (phone) { fields.push('phone=?'); values.push(phone); }
    if (password) { fields.push('password=?'); values.push(password); }

    if (fields.length === 0) return [{ affectedRows: 0 }];

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id=?`;
    values.push(id);

    const [result] = await db.execute(query, values);
    return [result];
  }

  static async delete(id) {
    const [result] = await db.execute(`DELETE FROM users WHERE id=?`, [id]);
    return [result];
  }
}