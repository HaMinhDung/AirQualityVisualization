import express from 'express';
import cors from 'cors';
import path from 'path';
import modelRoutes from './routes/models';
import sensorDataRoutes from './routes/sensorData';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', modelRoutes);
app.use('/', sensorDataRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 