import { db } from '../config/db.js';

export class FoundAnimal {
  static async create(data) {
    const [result] = await db.execute(
      `INSERT INTO found_animals
       (type, breed, gender, color, age, found_location, date_time, images, description, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.type,
        data.breed,
        data.gender,
        data.color,
        data.age,
        data.found_location,
        data.date_time,
        JSON.stringify(data.images || []),
        data.description,
        data.user_id
      ]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute(`SELECT * FROM found_animals ORDER BY date_time DESC`);
    return rows;
  }

  static async findByFilters(filters) {
    let query = `SELECT * FROM found_animals WHERE 1=1`;
    const values = [];

    if (filters.type) { query += ' AND type=?'; values.push(filters.type); }
    if (filters.location) { query += ' AND found_location LIKE ?'; values.push(`%${filters.location}%`); }
    if (filters.date) { query += ' AND DATE(date_time)=?'; values.push(filters.date); }

    const [rows] = await db.execute(query, values);
    return rows;
  }
}