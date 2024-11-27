"use client";
import DataCard from "@/components/DataCard";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const AdminPage = () => {
  const [sensor1Data, setSensor1Data] = useState({
    AQI_CN: 0,
    PM25: 0,
    PM10: 0,
    PM1: 0,
    CO2: 0,
    TempC: 0,
    TempF: 0,
    Humidity: 0,
  });

  const [sensor2Data, setSensor2Data] = useState({
    AQI_CN: 0,
    PM25: 0,
    PM10: 0,
    PM1: 0,
    CO2: 0,
    TempC: 0,
    TempF: 0,
    Humidity: 0,
  });

  useEffect(() => {
    // Fetch and parse CSV data for Sensor 1
    fetch('/data.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = Papa.parse(data, { header: true }).data[0];
        setSensor1Data({
          AQI_CN: parsedData['AQI CN'],
          PM25: parsedData['PM2.5 (ug/m3)'],
          PM10: parsedData['PM10 (ug/m3)'],
          PM1: parsedData['PM1 (ug/m3)'],
          CO2: parsedData['CO2 (ppm)'],
          TempC: parsedData['Temperature (Celsius)'],
          TempF: parsedData['Temperature (Fahrenheit)'],
          Humidity: parsedData['Humidity (%)'],
        });
      });

    // Fetch and parse CSV data for Sensor 2
    fetch('/data2.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = Papa.parse(data, { header: true }).data[0];
        setSensor2Data({
          AQI_CN: parsedData['AQI CN'],
          PM25: parsedData['PM2.5 (ug/m3)'],
          PM10: parsedData['PM10 (ug/m3)'],
          PM1: parsedData['PM1 (ug/m3)'],
          CO2: parsedData['CO2 (ppm)'],
          TempC: parsedData['Temperature (Celsius)'],
          TempF: parsedData['Temperature (Fahrenheit)'],
          Humidity: parsedData['Humidity (%)'],
        });
      });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col overflow-y-auto">
      {/* MAIN CONTENT - Adjusted height */}
      <div className="flex-1 h-[calc(100vh-150px)] grid grid-rows-2 gap-3 p-4">
        
        {/* SENSOR 1 */}
        <div>
          <h2 className="text-lg font-bold mb-2">Sensor 1</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* TOP LEFT: DATA CARDS */}
            <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[100%]"> 
              <DataCard type="AQI CN" data_number={sensor1Data.AQI_CN} changes={-1}/>
              <DataCard type="PM2.5" data_number={sensor1Data.PM25} unit="ug/m3" changes={1} />
              <DataCard type="PM10" data_number={sensor1Data.PM10} unit="ug/m3" changes={0}/>
              <DataCard type="PM1" data_number={sensor1Data.PM1} unit="ug/m3" changes={-3}/>
            </div>
        
            {/* TOP RIGHT: DATA CARDS */}
            <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[100%]">
              <DataCard type="CO2" data_number={sensor1Data.CO2} unit="ppm" changes={3}/>
              <DataCard type="Temperature (C)" data_number={sensor1Data.TempC} unit="°C" changes={-2}/>
              <DataCard type="Temperature (F)" data_number={sensor1Data.TempF} unit="°F" changes={1}/>
              <DataCard type="Humidity" data_number={sensor1Data.Humidity} unit="%" changes={2}/>
            </div>
          </div>
        </div>

        {/* SENSOR 2 */}
        <div>
          <h2 className="text-lg font-bold mb-2">Sensor 2</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* BOTTOM LEFT: DATA CARDS */}
            <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[100%]">
              <DataCard type="AQI CN" data_number={sensor2Data.AQI_CN}  changes={0}/>
              <DataCard type="PM2.5" data_number={sensor2Data.PM25} unit="ug/m3" changes={1}/>
              <DataCard type="PM10" data_number={sensor2Data.PM10} unit="ug/m3" changes={-3}/>
              <DataCard type="PM1" data_number={sensor2Data.PM1} unit="ug/m3" changes={7}/>
            </div>

            {/* BOTTOM RIGHT: DATA CARDS */}
            <div className="bg-gray-200 rounded-lg shadow-lg p-3 grid grid-cols-2 gap-3 h-[100%]">
              <DataCard type="CO2" data_number={sensor2Data.CO2} unit="ppm" changes={3}/>
              <DataCard type="Temperature (C)" data_number={sensor2Data.TempC} unit="°C" changes={4}/>
              <DataCard type="Temperature (F)" data_number={sensor2Data.TempF} unit="°F" changes={-2}/>
              <DataCard type="Humidity" data_number={sensor2Data.Humidity} unit="%" changes={-1}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
