"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [models, setModels] = useState<string[]>([]); // Danh sách file 3D
    const [selectedFile, setSelectedFile] = useState<string>(''); // File được chọn để xóa

    // Hàm xử lý thay đổi file được chọn
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    // Hàm tải lên file
    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            fetchModels(); // Tải lại danh sách file sau khi upload thành công
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred while uploading the file.');
            }
        }
    };

    // Lấy danh sách các file 3D từ server
    const fetchModels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/models');
            setModels(response.data.models);
        } catch (error) {
            setMessage('Failed to fetch models.');
        }
    };

    // Hàm xóa file
    const handleDelete = async () => {
        if (!selectedFile) {
            setMessage('Please select a file to delete.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/delete/${selectedFile}`);
            setMessage(response.data.message);
            fetchModels(); // Cập nhật lại danh sách file sau khi xóa
        } catch (error) {
            setMessage('Failed to delete the file.');
        }
    };

    // Lấy danh sách file 3D khi component load
    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload File</button>
            </div>
            {message && <p>{message}</p>}

            <div>
                <h3>Existing 3D Models</h3>
                <ul>
                    {models.length > 0 ? (
                        models.map((model, index) => (
                            <li key={index}>
                                {model}
                                <button onClick={() => setSelectedFile(model)}>Select to Delete</button>
                            </li>
                        ))
                    ) : (
                        <p>No models available</p>
                    )}
                </ul>
            </div>

            <div>
                <button onClick={handleDelete}>Delete Selected File</button>
            </div>
        </div>
    );
};

export default FileUpload;
