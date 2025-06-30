import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import plantationRoutes from'./routes/plantationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoute from './routes/adminRoute.js'; 
import resourceRoute from './routes/resourceRoute.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', authRoute);
app.use('/api/users', userRoutes);

app.use('/api/plantations', plantationRoutes);
app.use('/api/admin', adminRoute); 
app.use('/api/resources', resourceRoute);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});
