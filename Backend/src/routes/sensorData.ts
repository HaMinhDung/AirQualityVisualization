import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

// Create sensor data structure for a new model
router.post('/sensor-data', async (req, res) => {
  try {
    const { modelName, initialData } = req.body;
    
    await prisma.sensorData.create({
      data: {
        modelName,
        temperature: initialData.temperature,
        humidity: initialData.humidity,
        pm25: initialData.pm25,
        timestamp: initialData.timestamp
      }
    });

    res.status(201).json({ message: 'Sensor data structure created' });
  } catch (error) {
    console.error('Error creating sensor data:', error);
    res.status(500).json({ error: 'Failed to create sensor data' });
  }
});

// Delete sensor data for a model
router.delete('/sensor-data/:modelName', async (req, res) => {
  try {
    const { modelName } = req.params;
    
    await prisma.sensorData.delete({
      where: {
        modelName
      }
    });

    res.json({ message: 'Sensor data deleted' });
  } catch (error) {
    console.error('Error deleting sensor data:', error);
    res.status(500).json({ error: 'Failed to delete sensor data' });
  }
});

export default router; 