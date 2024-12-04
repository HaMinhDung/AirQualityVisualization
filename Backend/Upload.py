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
    



def find_next_available_file(folder_path, base_name, extension=".glb"):
    """
    Tìm số nhỏ nhất chưa được sử dụng cho file có dạng base_nameX.extension (X là số nguyên dương).

    Args:
        folder_path (str): Đường dẫn tới thư mục.
        base_name (str): Tên cơ bản của file, mặc định là "file".
        extension (str): Phần mở rộng của file, mặc định là ".glb".

    Returns:
        int: Số nhỏ nhất mà file `base_nameX.extension` chưa tồn tại.
    """
    x = 1
    while True:
        filename = f"{base_name}{x}{extension}"
        file_path = os.path.join(folder_path, filename)
        if not os.path.isfile(file_path):
            return x
        x += 1


# Ví dụ sử dụng
"""folder_path = "3D models"
base_name = ""
extension = ".glb"

next_available = find_next_available_file(folder_path, base_name, extension)
print(f"Số tiếp theo khả dụng là: {next_available}")"""
