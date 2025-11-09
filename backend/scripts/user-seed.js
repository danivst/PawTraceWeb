import { User } from '../models/User.js';

const dummyUsers = [
  { name: 'Alice Smith', email: 'alice@example.com', phone: '1234567890', password: 'password1', role: 'user' },
  { name: 'Bob Johnson', email: 'bob@example.com', phone: '2345678901', password: 'password2', role: 'user' },
  { name: 'Carol Davis', email: 'carol@example.com', phone: '3456789012', password: 'password3', role: 'user' },
  { name: 'David Miller', email: 'david@example.com', phone: '4567890123', password: 'password4', role: 'user' },
  { name: 'Eve Wilson', email: 'eve@example.com', phone: '5678901234', password: 'password5', role: 'user' },
  { name: 'Frank Thomas', email: 'frank@example.com', phone: '6789012345', password: 'password6', role: 'user' },
  { name: 'Grace Lee', email: 'grace@example.com', phone: '7890123456', password: 'password7', role: 'user' },
  { name: 'Henry Walker', email: 'henry@example.com', phone: '8901234567', password: 'password8', role: 'user' },
  { name: 'Ivy Hall', email: 'ivy@example.com', phone: '9012345678', password: 'password9', role: 'user' },
  { name: 'Jack Young', email: 'jack@example.com', phone: '0123456789', password: 'password10', role: 'user' },

  { name: 'Admin One', email: 'admin1@example.com', phone: '1111111111', password: 'adminpass1', role: 'admin' },
  { name: 'Admin Two', email: 'admin2@example.com', phone: '2222222222', password: 'adminpass2', role: 'admin' }
];

async function seedUsers() {
  try {
    for (const user of dummyUsers) {
      await User.create(user);
    }
    console.log('Dummy users and admins inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error inserting users:', err);
    process.exit(1);
  }
}

seedUsers();