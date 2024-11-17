"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";  // Import THREE.js

const RoomVisualizationPage = () => {
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);  // Reference to OrbitControls
  const canvasRef = useRef<HTMLDivElement>(null);  // Reference to canvas container

  // Load the GLB model
  const Model = () => {
    const gltf = useGLTF("/Room1.glb"); // Path to GLB file
    return <primitive object={gltf.scene} scale={1} castShadow />;
  };

  // Handler for button clicks
  const handleButtonClick = (data: string) => {
    setSelectedData(data);
  };

  // Capture mouse position and zoom based on it
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (canvasRef.current && controlsRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) / rect.width * 2 - 1;
        const mouseY = -(event.clientY - rect.top) / rect.height * 2 + 1;

        // Get the direction of the zoom
        const zoomFactor = event.deltaY * 0.01; // Adjust sensitivity here
        
        // Compute a new zoom level based on mouse position
        const newPosition = controlsRef.current.object.position;
        const direction = controlsRef.current.object.getWorldDirection(new THREE.Vector3());

        // Adjust camera position along the direction of the zoom
        const zoomAmount = zoomFactor * (newPosition.z / direction.z); // Zoom along the Z-axis
        newPosition.addScaledVector(direction, zoomAmount);

        controlsRef.current.update();  // Apply changes to controls
      }
    };

    // Add event listener to capture mouse scroll
    canvasRef.current?.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      // Cleanup the event listener when the component unmounts
      canvasRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">3D Room Visualization</h1>

      {/* 3D Room Visualization */}
      <div
        ref={canvasRef}
        style={{ width: "100%", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

          {/* OrbitControls configuration */}
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enableRotate={false}
            enablePan={false}
            zoomSpeed={1}
          />

          {/* Render GLB Model */}
          <Model />

          {/* Clickable Buttons */}
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
