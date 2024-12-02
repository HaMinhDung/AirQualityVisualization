"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [models, setModels] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        if (models.length >= 3) {
            setMessage('Maximum number of models reached. Please delete a model before uploading a new one.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
            fetchModels();
        } catch (error) {
            setMessage(
                axios.isAxiosError(error) && error.response
                    ? error.response.data.error
                    : 'An error occurred while uploading the file.'
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchModels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/models');
            setModels(response.data.models);
        } catch (error) {
            setMessage('Failed to fetch models.');
        }
    };

    const handleDelete = async () => {
        if (!selectedFile) {
            setMessage('Please select a file to delete.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:5000/delete/${selectedFile}`);
            setMessage(response.data.message);
            setSelectedFile('');
            await fetchModels();
        } catch (error) {
            setMessage('Failed to delete the file.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 border border-blue-700"
                >
                    {loading ? 'Uploading...' : 'Upload File'}
                </button>
            </div>
            {message && <p className="text-sm text-gray-600">{message}</p>}

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Existing 3D Models</h3>
                <ul className="divide-y divide-gray-200">
                    {models.length > 0 ? (
                        models.map((model, index) => (
                            <li key={index} className="py-2 flex items-center justify-between">
                                <span>{model}</span>
                                <button
                                    onClick={() => setSelectedFile(model)}
                                    className={`py-1 px-3 text-sm font-medium rounded-lg shadow-md border ${
                                        selectedFile === model
                                            ? 'bg-red-600 text-white border-red-700'
                                            : 'bg-gray-200 text-gray-800 border-gray-300'
                                    } hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75`}
                                >
                                    {selectedFile === model ? 'Selected' : 'Select to Delete'}
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-sm text-gray-600">No models available</p>
                    )}
                </ul>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleDelete}
                    disabled={!selectedFile || loading}
                    className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 border border-red-700"
                >
                    {loading ? 'Deleting...' : 'Delete Selected File'}
                </button>
            </div>
        </div>
    );
};

export default FileUpload;