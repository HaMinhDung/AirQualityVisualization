"use client";
import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, useGLTF, OrbitControls } from "@react-three/drei";
import axios from "axios";

const EditSensorPlan = () => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [sensors, setSensors] = useState<{ id: number; name: string; position: [number, number, number] }[]>([]);
  const [numSensors, setNumSensors] = useState<number>(0);
  const [renamingSensor, setRenamingSensor] = useState<number | null>(null);
  const [placingSensor, setPlacingSensor] = useState<number | null>(null);
  const [sensorCursorPos, setSensorCursorPos] = useState<[number, number, number] | null>(null);
  const [cameraPosition] = useState([5, 5, 5]);
  const [plans, setPlans] = useState<{ name: string; model: string }[]>([]); // State for plans
  const [selectedPlan, setSelectedPlan] = useState<string>(""); // State for selected plan

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/models");
        const modelsList = response.data.models;
        setModels(modelsList);
        if (modelsList.length > 0) setSelectedModel(modelsList[0]);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  // Fetch created plans from the sensors page
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/plans"); // Adjust the endpoint as necessary
        setPlans(response.data.plans || []); // Assuming the response has a 'plans' array
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchModel = async () => {
      if (!selectedModel) return;

      try {
        const response = await fetch(`http://localhost:5000/download/${selectedModel}`);
        if (!response.ok) throw new Error("Failed to fetch model");
        const blob = await response.blob();
        setModelUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchModel();
  }, [selectedModel]);

  const handleSensorCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setNumSensors(count);
    const newSensors = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Sensor ${i + 1}`,
      position: [0, 0, 0],
    }));
    setSensors(newSensors);
  };

  const renameSensor = (id: number, newName: string) => {
    setSensors((prevSensors) =>
      prevSensors.map((sensor) => (sensor.id === id ? { ...sensor, name: newName } : sensor))
    );
  };

  const handlePlaceSensor = (sensorId: number) => {
    setPlacingSensor(sensorId);
  };

  const handleCanvasClick = (e: any) => {
    if (placingSensor !== null) {
      const { point } = e;
      const newPosition: [number, number, number] = [point.x, point.y, point.z];

      setSensors((prevSensors) =>
        prevSensors.map((sensor) =>
          sensor.id === placingSensor ? { ...sensor, position: newPosition } : sensor
        )
      );
      setPlacingSensor(null);
    }
  };

  const handleEditCoordinate = (sensorId: number, coordinate: "x" | "y" | "z", value: number) => {
    setSensors((prevSensors) =>
      prevSensors.map((sensor) =>
        sensor.id === sensorId ? {
          ...sensor,
          position: [
            coordinate === "x" ? value : sensor.position[0],
            coordinate === "y" ? value : sensor.position[1],
            coordinate === "z" ? value : sensor.position[2],
          ]
        } : sensor
      )
    );
  };

  const saveChanges = () => {
    console.log("Saved sensors:", sensors);
    alert("Sensor positions saved successfully!");
  };

  const Model = () => {
    if (!modelUrl) return null;
    const gltf = useGLTF(modelUrl);
    return <primitive object={gltf.scene} scale={1} />;
  };

  const Sensor = ({ position, name }: { position: [number, number, number]; name: string }) => (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="orange" />
      <Html distanceFactor={10}>
        <div className="p-1 bg-gray-800 text-white text-xs rounded">{name}</div>
      </Html>
    </mesh>
  );

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-200">
      {/* Dropdown for selecting plans */}
      <div className="absolute top-4 left-4 z-10">
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a Plan</option>
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute top-4 right-4 z-50 p-4 bg-white rounded shadow-lg w-64">
        <h2 className="text-lg font-bold mb-4">Edit Plan</h2>
        <label className="block mb-2">
          Number of Sensors:
          <select
            className="w-full mt-1 p-2 border rounded"
            value={numSensors}
            onChange={handleSensorCountChange}
          >
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4">
          {sensors.map((sensor) => (
            <div key={sensor.id} className="flex items-center justify-between mb-2">
              {renamingSensor === sensor.id ? (
                <input
                  type="text"
                  className="border rounded p-1 flex-1 mr-2"
                  defaultValue={sensor.name}
                  onBlur={(e) => {
                    renameSensor(sensor.id, e.target.value);
                    setRenamingSensor(null);
                  }}
                  autoFocus
                />
              ) : (
                <span>{sensor.name}</span>
              )}
              <div className="flex items-center">
                {/* Rename Button */}
                <button onClick={() => setRenamingSensor(sensor.id)} className="mr-2">
                  <img src="/rename.png" alt="Rename" className="w-4 h-4" />
                </button>

                {/* Place Button */}
                <button onClick={() => handlePlaceSensor(sensor.id)}>
                  <img src="/place.png" alt="Place" className="w-4 h-4" />
                </button>
              </div>
              <div>
                {/* Coordinates Display */}
                {sensor.position.map((coord, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{["X", "Y", "Z"][index]}:</span>
                    <input
                      type="number"
                      value={coord}
                      onChange={(e) => handleEditCoordinate(sensor.id, ["x", "y", "z"][index], parseFloat(e.target.value))}
                      className="w-16 p-1 text-xs border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={saveChanges}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Save Changes
        </button>
      </div>

      <div className="relative" style={{ width: "100%", height: "100vh" }}>
        <Canvas
          onClick={handleCanvasClick}
          camera={{
            position: cameraPosition,
            zoom: 1.0,
            fov: 50,
          }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Model />
          {sensors.map((sensor) => (
            <Sensor key={sensor.id} position={sensor.position} name={sensor.name} />
          ))}
          {placingSensor !== null && sensorCursorPos && (
            <mesh position={sensorCursorPos}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color="blue" />
            </mesh>
          )}
          <OrbitControls enableDamping />
        </Canvas>
      </div>
    </div>
  );
};

export default EditSensorPlan;