"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePlanPage: React.FC = () => {
  const router = useRouter();

  // State for models and plans
  const [models, setModels] = useState<string[]>([]);
  const [plans, setPlans] = useState<{ name: string; model: string }[]>([]);

  const [newPlanName, setNewPlanName] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/models");
        setModels(response.data.models || []);
      } catch (error) {
        console.error("Failed to fetch models:", error);
        setMessage("Failed to fetch models. Please try again.");
      }
    };
    fetchModels();
  }, []);

  const handleCreatePlan = () => {
    if (!newPlanName.trim() || !selectedModel) {
      setMessage("Please enter a valid plan name and select a model.");
      return;
    }

    const newPlan = { name: newPlanName.trim(), model: selectedModel };
    setPlans([...plans, newPlan]);
    setNewPlanName("");
    setSelectedModel("");
    setMessage("Plan created successfully!");
  };

  const handleDeletePlan = (index: number) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
    setMessage("Plan deleted successfully.");
  };

  const handleEditRedirect = () => {
    router.push("/3dmodel/sensors/edit");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Plan</h2>

      {/* Plan Creation Form */}
      <div className="mb-4">
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
          placeholder="Enter plan name"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none"
        />

        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none"
        >
          <option value="">Select a model</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreatePlan}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Create Plan
        </button>
      </div>

      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      {/* List of Created Plans */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Created Plans</h3>
        <ul className="divide-y divide-gray-200">
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <li key={index} className="py-2 flex items-center justify-between text-gray-700">
                <span>
                  {plan.name} - <strong>{plan.model}</strong>
                </span>
                <button
                  onClick={() => handleDeletePlan(index)}
                  className="py-1 px-3 bg-red-500 text-white text-sm rounded-full transition duration-300 hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600">No plans created yet.</p>
          )}
        </ul>
      </div>

      {/* Big Edit Button */}
      <button
        onClick={handleEditRedirect}
        className="w-full mt-6 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Edit Plan
      </button>
    </div>
  );
};

export default CreatePlanPage;