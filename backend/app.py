from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app=Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
user_cl = db["users"] 

#Register
def handle_register(data):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")

    if not username or not email or not password or not confirm_password:
        return {"success": False, "message": "All fields are required!"}

    if password != confirm_password:
        return {"success": False, "message": "Passwords do not match!"}

    if user_cl.find_one({"email": email}):
        return {"success": False, "message": "Email already registered!"}

    # Store user (in a real app, hash the password before storing)
    hashed_password = generate_password_hash(password)
    user_cl.insert_one({"username": username, "email": email, "password": hashed_password})
    return {"success": True, "message": "Registration successful!"}

# Login
def handle_login(data):
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return {"success": False, "message": "Email and password are required!"}
    user = user_cl.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return {"success": True, "message": "Login successful!"}
    else:
        return {"success": False, "message": "Invalid email or password."}

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    response=handle_login(data)
    return jsonify(response)

@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    response=handle_register(data)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)