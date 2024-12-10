import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    
    # Create users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL
        )
    ''')
    
    # Create user_models table for mapping users to their accessible 3D models
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_models (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            model_name TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Insert a default admin user if not exists
    c.execute("SELECT * FROM users WHERE email = ?", ("admin@vinuni.edu.vn",))
    if not c.fetchone():
        admin_password = generate_password_hash("admin123")
        c.execute("INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
                 ("admin@vinuni.edu.vn", admin_password, "admin"))
        
        # Add some default models for admin
        c.execute("SELECT id FROM users WHERE email = ?", ("admin@vinuni.edu.vn",))
        admin_id = c.fetchone()[0]
        default_models = ["model1.glb", "model2.glb", "model3.glb"]
        for model in default_models:
            c.execute("INSERT INTO user_models (user_id, model_name) VALUES (?, ?)",
                     (admin_id, model))
    
    conn.commit()
    conn.close()

def get_user(email):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()
    return user

def get_user_models(user_id):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT model_name FROM user_models WHERE user_id = ?", (user_id,))
    models = c.fetchall()
    conn.close()
    return [model[0] for model in models]

def verify_password(stored_password_hash, provided_password):
    return check_password_hash(stored_password_hash, provided_password) 