export type SensorDataPoint = {
  name: string;
  value: number;
};

export type RoomSensorData = {
  temperatureData: SensorDataPoint[];
  humidityData: SensorDataPoint[];
  pm25Data: SensorDataPoint[];
}; 