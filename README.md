# Project README

## Overview

This project is designed to manage and visualize 3D models, and sensor data, and interact with a Gemini-based chatbot. It includes a backend built with Python and a frontend built with React and TypeScript. Below are the main features, working methods, and potential areas for future development. For further information, please have a look at the accompanying documents

## Main Features

- **3D Model Management**
- **Sensor Data Management**
- **Gemini Chatbot Management**

### Project Structure

- **Backend**: The backend is built using Python. The functions from various files are integrated into `server.py`, which acts as the server and handles the communication with the frontend via different API endpoints.
- **Frontend**: The frontend is developed using React and TypeScript. Each page in the frontend connects to corresponding endpoints in the backend.

---

## Feature Overview and Development Directions

### 1. **3D Model Management**

- **Current Setup**:
  - The 3D models are stored in the `3D models` folder, numbered in ascending order, and saved in `.glb` format.
  - In the backend (`server.py`), there are three main endpoints for managing these models:
    - `@app.route('/models', methods=['GET'])`: Displays existing models.
    - `@app.route('/upload', methods=['POST'])`: Uploads and converts models to `.glb` format.
    - `@app.route('/delete/<filename>', methods=['DELETE'])`: Deletes existing models from the `3D models` folder.
    - `@app.route('/download/<filename>', methods=['GET'])`: Allows downloading of existing models.
  - **Frontend**:
    - **`Frontend/src/app/(dashboard)/3dmodel`** contains 3 main files for displaying, managing, and adding sensors (sensor functionality is incomplete at the backend).
    - **`manage.tsx`**: Connects to the `/models`, `/upload`, and `/delete` endpoints to manage files.
    - **`display.tsx`**: Uses the `/download` endpoint to display models from the server.
    - **`sensors.tsx`**: Creates sensor buttons on the 3D model (backend support is still pending).

- **Future Development**:
  - **Sensor Position Display**: Add functionality to display sensor locations within the 3D model and show related data.
    - Create new endpoints in the backend to manage and store sensor positions.
    - Collect API keys from users during sensor setup and store them alongside sensor positions.
    - Fetch sensor data using the API key and store it in the Firebase database.
    - Display sensor data by creating new endpoints for each sensor's data.
  - **User Roles and Security**:
    - Organize 3D models into different folders for different users, ensuring each user has access to their respective data.
    - Consider additional security measures to prevent unauthorized access.

---

### 2. **Sensor Data Management**

- **Current Setup**:
  - On startup, the server calls the sensor API once a day and updates the Firebase database using the `index.js` file in the backend.
  - New time-series graphs are created based on the latest data and stored in `Backend/statics/graphs`.
  - These graphs are returned to the frontend via the `/graphs/<graph_type>` endpoint and updated via `/update-graphs`.
  - The frontend requests and displays the graphs in **`Frontend/src/app/(dashboard)/data/time-series`**.

- **Future Development**:
  - **User-specific Data**:
    - Modify the Firebase database to manage data securely for multiple users.
    - Update `index.js` to fetch data from any user's sensors and store it appropriately in the database.
    - Update endpoints to allow each user to access their own data securely.
  - **Additional Data Analysis**:
    - Provide customizable data analysis functionality by updating the frontend (`Frontend/src/app/(dashboard)/data`).
    - Add more data analysis features to the backend and expose new endpoints.
    - Integrate Gemini Chatbot for data analysis assistance (see below).

---

### 3. **Gemini Chatbot Management**

- **Current Setup**:
  - The chatbot is based on **Gemini 1.5 Flash 8B** by Google (see documentation for Google Gemini API).
  - It is designed to guide users and fetch sensor data (from `PlotGraph.py`) via the `Gemini.py` file.
  - The frontend communicates with the chatbot via the `/chatbot` POST endpoint.

- **Future Development**:
  - **User-specific Data Access**:
    - Update the chatbot functionality to prevent reading data from other users' accounts.
  - **3D Model and Image Processing**:
    - Enhance `Gemini.py` to support 3D model reading and image processing, leveraging the Vision/Document Processing capabilities of Gemini API.

---

## Setup and Usage

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HaMinhDung/AirQualityVisualization.git
   ```

2. Install dependencies:
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python server.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```



