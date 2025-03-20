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
    return {"message": "User registered successfully!"}

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