import express from 'express';
import cors from 'cors';
import animalRoutes from './routes/animal-routes.js';
import userRoutes from './routes/user-routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/animals', animalRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));