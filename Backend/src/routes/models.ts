import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Get all models
router.get('/models', async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../uploads');
    const files = await fs.readdir(uploadDir);
    const models = files.filter(file => file.endsWith('.glb'));
    res.json({ models });
  } catch (error) {
    console.error('Error getting models:', error);
    res.status(500).json({ error: 'Failed to get models' });
  }
});

// Upload model
router.post('/upload', upload.single('model'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'Model uploaded successfully' });
  } catch (error) {
    console.error('Error uploading model:', error);
    res.status(500).json({ error: 'Failed to upload model' });
  }
});

// Delete model
router.delete('/models/:modelName', async (req, res) => {
  try {
    const { modelName } = req.params;
    const filePath = path.join(__dirname, '../uploads', modelName);
    await fs.unlink(filePath);
    res.json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error('Error deleting model:', error);
    res.status(500).json({ error: 'Failed to delete model' });
  }
});

export default router; 