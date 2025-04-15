from flask import jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from dbSchema.userSchema import User
from dbSchema.ImageSchema import Image
import base64
from datetime import datetime
import traceback
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


def handleSetImage(image,filename,content_type,image_cl,userid):
    # filename=data["filename"]
    # content_type=data["content_type"]
    try:
        print("Handling Image...")
        print(f"Filename: {filename}")
        print(f"Content Type: {content_type}")

        # Read the image data
        binary = image.read()
        print(f"Binary data length: {len(binary)}")

        encodedImage = base64.b64encode(binary).decode('utf-8')
        print(f"Encoded image (base64): {encodedImage[:50]}...")  # Print only the start to avoid massive output

        id = str(datetime.now())
        print(f"Image ID: {id}")
        newImage=Image(
            _id=id,
            filename=filename,
            content_type=content_type,
            imageFile=encodedImage,
            user_id=userid
        )
        # Simulating storing image (in real case, store it in DB or file system)
        image_cl.insert_one(newImage.to_mongo().to_dict())

        return jsonify({
            "success": True,
            "message": "Image uploaded successfully",
            "imageID": id
        })

    except Exception as e:
        print("Error in handleSetImage:", e)
        traceback.print_exc()  # This will give us more detailed logs
        return jsonify({"success": False, "message": f"Error handling image : {e}"}), 500

def handleGetImage(data,image_cl):
    image=image_cl.find({"_id":data._id})
    image=base64.b64decode(image["imageFile"])
    if image:
        return jsonify({"success":True,"imageID":image._id,"image":image["imageFile"]})
    else:
        return jsonify({"success":False,"message":"Image not found"})
    
def handleGetImageList(image_cl,user_id):
    images=image_cl.find({"user_id":user_id})
    imageList=[]
    try:

        for image in images:
            file=image["_id"]
            imageList.append({
                "imageID": file,
                "filename":image["filename"],
                "imageFile":image["imageFile"]
            })
        return imageList
    
    
    except Exception as e:
        return jsonify({"Success":"false","message":f"Error in getting image list: {e}"}),500