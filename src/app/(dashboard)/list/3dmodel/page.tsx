"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import * as THREE from "three";

const RoomVisualizationPage = () => {
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const [showDataAnalytics, setShowDataAnalytics] = useState(false);
  const controlsRef = useRef<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Data for the bar chart
  const analyticsData = [
    { label: "Temperature", value: 45 },
    { label: "Humidity", value: 70 },
    { label: "PM2.5", value: 30 },
  ];
  const maxValue = Math.max(...analyticsData.map((d) => d.value));

  // Load the GLB model
  const Model = () => {
    const gltf = useGLTF("/Room1.glb");
    return <primitive object={gltf.scene} scale={1} castShadow />;
  };

  // Handler for button clicks
  const handleButtonClick = (data: string) => {
    setSelectedData(data);
  };

  // Toggle Data Analytics
  const toggleDataAnalytics = () => {
    setShowDataAnalytics((prev) => !prev);
  };

  return (
    <div className="relative p-4">
      <h1 className="text-2xl font-semibold mb-4">3D Room Visualization</h1>

      {/* 3D Visualization */}
      <div
        ref={canvasRef}
        style={{ width: "100%", height: "100vh" }}
        className="relative"
      >
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

          <OrbitControls ref={controlsRef} enableZoom={true} />

          {/* Render GLB Model */}
          <Model />

          {/* Sensor Buttons */}
          <Html position={[-1.2, 1, 1]}>
            <button
              onClick={() => handleButtonClick("Temperature Data")}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Sensor 1
            </button>
          </Html>
          <Html position={[1, 1, -1]}>
            <button
              onClick={() => handleButtonClick("Humidity Data")}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Sensor 2
            </button>
          </Html>
          <Html position={[0, -1, 1.5]}>
            <button
              onClick={() => handleButtonClick("PM2.5 Data")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Sensor 3
            </button>
          </Html>
        </Canvas>

        {/* Data Analytics Dropdown */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDataAnalytics}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow"
          >
            Data Analytics
          </button>
          {showDataAnalytics && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white shadow-lg rounded p-4 mt-2 w-64"
            >
              <h2 className="text-lg font-semibold mb-4">Data Analytics</h2>
              <div>
                {analyticsData.map((item) => (
                  <div key={item.label} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(item.value / maxValue) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="bg-blue-500 h-4 rounded"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Data Display */}
        {selectedData && (
          <div className="absolute top-10 left-10 bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold text-lg">{selectedData}</h2>
            <p>This is the data for {selectedData.toLowerCase()}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomVisualizationPage;
