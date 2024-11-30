from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from Gemini import chatbot_response
import trimesh

app = Flask(__name__)
CORS(app)


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
    existing_files = os.listdir(models_folder)
    file_count = len(existing_files)

    if file_count >= 3:
        return jsonify({"error": "Exceeded the allowed number of 3 models, please delete to add more"}), 400

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
        new_filename = f"{file_count + 1}.glb"
        new_file_path = os.path.join(models_folder, new_filename)
        mesh.export(new_file_path, file_type='glb')

        # Xóa file tạm
        os.remove(temp_path)

        return jsonify({"message": "File uploaded successfully", "file_count": file_count + 1}), 200

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
if __name__ == '__main__':
    app.run(debug=True)

