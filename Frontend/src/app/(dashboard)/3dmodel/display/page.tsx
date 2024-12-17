"use client";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import BarChartComponent from "@/components/3dModelBarChart";
import axios from 'axios';
<<<<<<< HEAD
import { room1SensorData } from "@/data/sensorData/room1.glb";
=======
import { getRoomSensorData } from '@/data/sensorData';
>>>>>>> 87caa04586d0e3a98a843ea881493bd757be1185

const RoomVisualizationPage = () => {
  const [showDataAnalytics, setShowDataAnalytics] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);

<<<<<<< HEAD
  // Remove static data and use imported data
  const { temperatureData, humidityData, pm25Data } = room1SensorData;
=======
  const { temperatureData, humidityData, pm25Data } = getRoomSensorData(selectedModel);
>>>>>>> 87caa04586d0e3a98a843ea881493bd757be1185

  const toggleDataAnalytics = () => {
    setShowDataAnalytics((prev) => !prev);
  };

  // Fetch available models from backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/models');
        const modelsList = response.data.models;
        setModels(modelsList);
        // Set default model to the first one in the list
        if (modelsList.length > 0) {
          setSelectedModel(modelsList[0]);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  // Fetch the selected model from the server
  useEffect(() => {
    const fetchModel = async () => {
      if (!selectedModel) return;

      try {
        const response = await fetch(`http://localhost:5000/download/${selectedModel}`);
        if (!response.ok) throw new Error("Failed to fetch model");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setModelUrl(url); // Save the model URL to state
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchModel();
  }, [selectedModel]);

  // Model component to display the 3D model
  const Model = () => {
    if (!modelUrl) return null;
    const gltf = useGLTF(modelUrl);

    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-200">
      {/* Main content */}
      <div className="relative" style={{ width: "100%", height: "100vh" }}>
        {/* Model Selector */}
        <div className="absolute top-4 left-4 z-10">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <Canvas
          camera={{
            position: cameraPosition,
            rotation: [
              -52.98 * (Math.PI / 180),
              -0.71 * (Math.PI / 180),
              -0.95 * (Math.PI / 180),
            ],
            zoom: 1.0,
            fov: 50,
          }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Model />
          <OrbitControls enableDamping />
        </Canvas>

        {/* Button to show more data */}
        <div className="absolute top-4 right-4 z-50">
          <span
            onClick={toggleDataAnalytics}
            className="text-white underline cursor-pointer"
          >
            {showDataAnalytics ? "Collapse" : "Show More"}
          </span>
        </div>

        {/* Data display section */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={
            showDataAnalytics
              ? { width: "30%", opacity: 1 }
              : { width: 0, opacity: 0 }
          }
          transition={{ duration: 0.4 }}
          className={`absolute top-0 h-full bg-gradient-to-l from-black to-transparent z-40`}
          style={{
            right: showDataAnalytics ? 0 : undefined,
            height: "calc(100vh - 4rem)",
            marginTop: "4rem",
          }}
        >
          {showDataAnalytics && (
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-lg font-semibold text-white mb-4">
                Data Analytics
              </h2>
              <BarChartComponent
                data={temperatureData}
                title="Temperature"
                barColor="#FF5733"
              />
              <BarChartComponent
                data={humidityData}
                title="Humidity"
                barColor="#33C9FF"
              />
              <BarChartComponent
                data={pm25Data}
                title="PM2.5"
                barColor="#FFC300"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoomVisualizationPage;
