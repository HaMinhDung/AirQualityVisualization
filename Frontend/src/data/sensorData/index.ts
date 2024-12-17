import { RoomSensorData } from '@/types/sensorData';
import { room1SensorData } from './room1';
import { defaultSensorData } from './defaultData';

const sensorDataMap: { [key: string]: RoomSensorData } = {
  'room1.glb': room1SensorData,
  'room2.glb': defaultSensorData,
  'room3.glb': defaultSensorData,
  // Add more rooms as they're created
};

export const getRoomSensorData = (roomId: string): RoomSensorData => {
  return sensorDataMap[roomId] || defaultSensorData;
};

// Function to add a new room's sensor data
export const addRoomSensorData = (roomId: string) => {
  if (!sensorDataMap[roomId]) {
    sensorDataMap[roomId] = { ...defaultSensorData };
  }
}; 