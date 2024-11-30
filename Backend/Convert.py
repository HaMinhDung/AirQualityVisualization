import trimesh
import os

def convert_obj_to_glb(file_path):
    """
    Chuyển đổi tệp .obj sang .glb, xóa tệp cũ sau khi chuyển đổi.
    
    Args:
        file_path (str): Đường dẫn tới tệp .obj cần chuyển đổi.
    
    Returns:
        str: Đường dẫn tới tệp .glb đã chuyển đổi.
    """
    if not file_path.lower().endswith('.obj'):
        raise ValueError("File không phải định dạng .obj")
    
    # Đọc tệp .obj bằng trimesh
    mesh = trimesh.load(file_path)
    
    if mesh.is_empty:
        raise ValueError("Tệp .obj không hợp lệ hoặc không có dữ liệu.")
    
    # Tạo đường dẫn tệp mới với đuôi .glb
    new_file_path = file_path.replace('.obj', '.glb')
    
    # Lưu tệp dưới định dạng .glb
    mesh.export(new_file_path, file_type='glb')
    print(f"Tệp đã được chuyển đổi và lưu tại: {new_file_path}")
    
    # Xóa tệp .obj cũ
    os.remove(file_path)
    print(f"Tệp cũ {file_path} đã bị xóa.")
    
    return new_file_path

# Ví dụ sử dụng
file_path = "c:/Users/dungc/Downloads/vhmnifalctmo-lego551232512424/lego obj.obj"  # Thay bằng đường dẫn tệp của bạn
try:
    new_file_path = convert_obj_to_glb(file_path)
    print(f"Chuyển đổi thành công: {new_file_path}")
except Exception as e:
    print(f"Đã xảy ra lỗi: {e}")
