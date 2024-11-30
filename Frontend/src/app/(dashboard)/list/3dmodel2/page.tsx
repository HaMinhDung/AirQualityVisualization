"use client";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import BarChartComponent from "@/components/3dModelBarChart";

const RoomVisualizationPage = () => {
  const [showDataAnalytics, setShowDataAnalytics] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);

  // Dữ liệu phân tích (tĩnh)
  const temperatureData = [
    { name: "Mon", value: 45 },
    { name: "Tue", value: 50 },
    { name: "Wed", value: 55 },
    { name: "Thu", value: 40 },
    { name: "Fri", value: 60 },
  ];
  const humidityData = [
    { name: "Mon", value: 70 },
    { name: "Tue", value: 65 },
    { name: "Wed", value: 75 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 72 },
  ];
  const pm25Data = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 35 },
    { name: "Wed", value: 28 },
    { name: "Thu", value: 33 },
    { name: "Fri", value: 25 },
  ];

  const toggleDataAnalytics = () => {
    setShowDataAnalytics((prev) => !prev);
  };

  // Hàm tải file từ server
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch("http://localhost:5000/download/2.glb");
        if (!response.ok) throw new Error("Failed to fetch model");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setModelUrl(url); // Lưu URL của mô hình vào state
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchModel();
  }, []);

  // Component Model để hiển thị mô hình 3D
  const Model = () => {
    if (!modelUrl) return null; // Chỉ hiển thị khi modelUrl đã được tải

    const gltf = useGLTF(modelUrl); // Nạp mô hình từ URL

    return (
      <>
        <primitive object={gltf.scene} scale={1} />
        {/* Ví dụ thêm các cảm biến */}
        <mesh position={[1, 1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
          <Html distanceFactor={10}>
            <div className="p-1 bg-gray-800 text-white text-xs rounded">
              Sensor 1
            </div>
          </Html>
        </mesh>
        <mesh position={[-1, 1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="blue" />
          <Html distanceFactor={10}>
            <div className="p-1 bg-gray-800 text-white text-xs rounded">
              Sensor 2
            </div>
          </Html>
        </mesh>
      </>
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-200">
      {/* Nội dung chính */}
      <div className="relative" style={{ width: "100%", height: "100vh" }}>
        <Canvas
          camera={{
            position: [1.9, 11.38, 13.44],
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
        </Canvas>

        {/* Nút hiển thị thêm dữ liệu */}
        <div className="absolute top-4 right-4 z-50">
          <span
            onClick={toggleDataAnalytics}
            className="text-white underline cursor-pointer"
          >
            {showDataAnalytics ? "Collapse" : "Show More"}
          </span>
        </div>

        {/* Phần hiển thị dữ liệu */}
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
