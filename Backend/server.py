from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from Gemini import chatbot_response
import trimesh
from plotGraph import save_all_graphs
from Upload import find_next_available_file
import subprocess
import matplotlib
matplotlib.use('Agg')

app = Flask(__name__)

# Simple CORS configuration
CORS(app)

# Configure static folder with correct relative path
app.static_folder = 'static'
app.static_url_path = '/static'

# Initialize graphs and Node.js server when Flask starts
def init_app():
    try:
        # Create static/graphs directory if it doesn't exist
        graphs_dir = os.path.join('static/graphs')
        os.makedirs(graphs_dir, exist_ok=True)
        
        # Generate initial graphs in the main thread
        print("Generating initial graphs...")
        save_all_graphs()
        
        # Start Node.js server
        print("Starting Node.js server...")
        node_process = subprocess.Popen(['node', 'index.js'], 
                                      stdout=subprocess.PIPE,
                                      stderr=subprocess.PIPE)
        
        print("Initialization complete!")
    except Exception as e:
        print(f"Initialization error: {e}")

# Endpoint chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_input = data.get("message", "")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400
    
    response = chatbot_response(user_input)
    return jsonify({"response": response})

# Endpoint upload file

@app.route('/upload', methods=['POST'])
def upload_file():
    # Thư mục lưu trữ các file 3D
    models_folder = "3D models"
    os.makedirs(models_folder, exist_ok=True)

    # Các định dạng file được hỗ trợ
    ALLOWED_EXTENSIONS = {'.obj', '.stl', '.ply', '.glb'}

    # Hàm kiểm tra định dạng file
    def allowed_file(filename):
        _, ext = os.path.splitext(filename)
        return ext.lower() in ALLOWED_EXTENSIONS

    # Kiểm tra file trong request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file format"}), 400

    # Kiểm tra số lượng file trong thư mục 3D models
    folder_path = "3D models"
    base_name = ""
    extension = ".glb"

    next_available = find_next_available_file(folder_path, base_name, extension)

 
    # Lưu file tạm với tên và phần mở rộng chính xác
    _, ext = os.path.splitext(file.filename)
    temp_path = os.path.join(models_folder, "temp_file" + ext)
    file.save(temp_path)

    try:
        # Đọc file với trimesh
        mesh = trimesh.load(temp_path)

        # Kiểm tra nếu không thể tải mesh
        if mesh is None:
            return jsonify({"error": "File could not be processed by trimesh"}), 400
        
        # Chuyển đổi và lưu thành định dạng .glb
        new_filename = f"{next_available}.glb"
        new_file_path = os.path.join(models_folder, new_filename)
        mesh.export(new_file_path, file_type='glb')

        # Xóa file tạm
        os.remove(temp_path)

        return jsonify({"message": "File uploaded successfully"}), 200

    except Exception as e:
        # Xóa file tạm nếu xảy ra lỗi
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({"error": f"Failed to process file: {str(e)}"}), 500

# Endpoint download file
@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    models_folder = "3D models"
    file_path = os.path.join(models_folder, filename)

    if not os.path.isfile(file_path):
        return jsonify({"error": "File not found"}), 404

    return send_file(file_path, as_attachment=True)

# Endpoint hiển thị các file 3D hiện có
@app.route('/models', methods=['GET'])
def list_models():
    models_folder = "3D models"
    # Liệt kê các file trong thư mục
    existing_files = os.listdir(models_folder)
    
    # Chỉ giữ lại các file có định dạng hợp lệ
    allowed_files = [file for file in existing_files if file.lower().endswith(('.obj', '.stl', '.ply', '.glb'))]
    
    return jsonify({"models": allowed_files}), 200


# Endpoint xóa một file
@app.route('/delete/<filename>', methods=['DELETE'])
def delete_file(filename):
    models_folder = "3D models"
    file_path = os.path.join(models_folder, filename)

    if not os.path.isfile(file_path):
        return jsonify({"error": "File not found"}), 404

    try:
        os.remove(file_path)
        return jsonify({"message": f"File {filename} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete file: {str(e)}"}), 500

# Add new endpoint to generate/update graphs
@app.route('/update-graphs', methods=['POST'])
def update_graphs():
    try:
        save_all_graphs()
        return jsonify({"message": "Graphs updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to update graphs: {str(e)}"}), 500

# Add endpoints to serve each graph
@app.route('/graphs/<graph_type>', methods=['GET'])
def get_graph(graph_type):
    valid_types = ['pm25', 'temperature', 'humidity']
    if graph_type not in valid_types:
        return jsonify({"error": "Invalid graph type"}), 400
    
    graph_path = os.path.join('static/graphs', f'{graph_type}.png')
    print(f"Attempting to serve graph from: {graph_path}")  # Debug print
    
    if not os.path.exists(graph_path):
        try:
            save_all_graphs()  # Generate graphs if they don't exist
        except Exception as e:
            print(f"Failed to generate graphs: {e}")  # Debug print
            return jsonify({"error": f"Failed to generate graphs: {str(e)}"}), 500
    
    try:
        # Add headers to prevent caching and allow access
        response = send_file(
            graph_path, 
            mimetype='image/png',
            as_attachment=False,
            download_name=f'{graph_type}.png'
        )
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        print(f"Error serving file: {e}")  # Debug print
        return jsonify({"error": "Failed to serve graph"}), 500

if __name__ == '__main__':
    init_app()
    # Run with host='0.0.0.0' to allow external access
    app.run(host='0.0.0.0', port=5000, debug=True)

