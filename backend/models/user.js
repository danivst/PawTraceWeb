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
}