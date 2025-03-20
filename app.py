from flask import Flask, jsonify, request
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

#sample data for now WILL BE REPLACED BY DB
users = {
    "test@example.com": "password123", 
}

#Register
def handle_register(data):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    if not username or not email or not password or not confirm_password:
        return {"success": False, "message": "All fields are required!"}

    if password != confirm_password:
        return {"success": False, "message": "Passwords do not match!"}

    if email in users:
        return {"success": False, "message": "Email already registered!"}

    # Store user (in a real app, hash the password before storing)
    users[email] = {"username": username, "password": password}
    return {"success": True, "message": "Registration successful!"}

# Login
def handle_login(data):
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return {"success": False, "message": "Email and password are required!"}
    if email in users and users[email] == password:
        return {"success": True, "message": "Login successful!"}
    else:
        return {"success": False, "message": "Invalid email or password."}

@app.route('/login',method=['POST'])
def login():
    data=request.get_json()
    response=handle_login(data)
    return jsonify(response)

@app.route('/register',method=['POST'])
def register():
    data=request.get_json()
    response=handle_register(data)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)