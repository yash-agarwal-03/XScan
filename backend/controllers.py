from werkzeug.security import generate_password_hash, check_password_hash

#Register
def handle_register(data, user_cl):



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
def handle_login(data, user_cl):
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return {"success": False, "message": "Email and password are required!"}
    user = user_cl.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return {"success": True, "message": "Login successful!"}
    else:
        return {"success": False, "message": "Invalid email or password."}

# register - > handle_register() -> showtable() 
# 
# showtable()-> jinja tempplating -> show users registerd 
# 
# 
# 
