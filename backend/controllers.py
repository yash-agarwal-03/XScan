from flask import jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from dbSchema.userSchema import User
from dbSchema.ImageSchema import Image
import base64
from base64 import b64decode
from datetime import datetime
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

    hashed_password = generate_password_hash(password)
    newuser=User(
        username= username,
        email= email,
        password= hashed_password
    )
    user_cl.insert_one(newuser.to_mongo().to_dict())  

    return {"success": True, "message": "Registration successful!"}


# Login
def handle_login(data, user_cl):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"success": False, "message": "Email and password are required!"}

    user = user_cl.find_one({"email": email})
    
    if user:
        print("User found in DB:", user)  # Debugging print
        if "password" in user and check_password_hash(user["password"], password):
            return {
                "success": True,
                "message": "Login successful!",
                "user": {
                    "email": user["email"],
                    "name": user.get("username", "User")  # Avoid KeyError
                }
            }
    
    return {"success": False, "message": "Invalid email or password."}

def showtable(user_cl):
    users = user_cl.find()
    user_list = []
    count=0
    for user in users:
        count=count+1
        user_list.append({"id":count , "username": user["username"], "email": user["email"]})
    user_list=jsonify(user_list)
    return render_template('index.html', users=user_list)


def handleSetImage(data,image_cl,user_id):
    filename=data["filename"]
    content_type=data["content_type"]
    image=data["image"]
    binary=image.read()
    encodedImage=base64.b64encode(binary).decode('utf-8')
    id=datetime.now()
    print(id)
    newImage=Image(
        _id=str(id),
        filename=filename,
        content_type=content_type,
        imageFile=encodedImage,
        user_id=user_id
    )

    image_cl.insert_one(newImage)
    return jsonify({"success":True,"message":"Image uploaded successfully","imageID":str(id)})

def handleGetImage(data,image_cl):
    image=image_cl.find({"_id":data._id})
    image=b64decode(image["imageFile"])
    if image:
        return jsonify({"success":True,"imageID":image._id,"image":image["imageFile"]})
    else:
        return jsonify({"success":False,"message":"Image not found"})
    
def handleGetImageList(image_cl,user_id):
    images=image_cl.find({"user_id":user_id})
    imageList=[]
    for image in images:
        imageList.append({
            "imageID":image["_id"],
            "imageFile":image["imageFile"]
        })
    return imageList