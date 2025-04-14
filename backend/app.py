from flask import Flask, jsonify, request, session
from flask_cors import CORS
import traceback
from pymongo import MongoClient
from controllers import *

app=Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
user_cl = db["users"]
image_cl=db["images"]

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    response=handle_login(data,user_cl)
    if response["success"]:
        session["user"] = response["user"]
    return jsonify(response)

@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    response=handle_register(data,user_cl)
    return jsonify(response)


@app.route('/users',methods=['GET'])
def users():
    return render_template('index.html')

# /users -> index.html (script)->fetchUsers()-> api/users -> sends the data back as json to Javascript
@app.route('/api/users',methods=['GET'])
def getusers():
    users=user_cl.find()
    userlist=[{"id":id+1,"username":user["username"],"email":user["email"]} for id,user in enumerate(users)]
    return jsonify(userlist)

@app.route('/api/setImage',methods=['POST'])
def setImage():
    try:
        print("thisis debug",request.files)
        print("thisis debug",request.form)
        if "image" not in request.files:
            return jsonify({"success":False,"message":"No image provided"}),400

        image=request.files["image"]
        filename=request.form.get("filename")
        content_type=request.form.get("content_type")
        if "user" not in session:
            return jsonify({"success": False, "message": "User not authenticated"}), 401
        user_id=session["user"]["email"]
        response=handleSetImage(image,filename,content_type,image_cl,user_id)
        
        return response
    except Exception as e:
        print("Error:", e)
        traceback.print_exc()  # Print stack trace to the console for debugging
        return jsonify({"success": False, "message": "Server Error"}), 500



@app.route('/api/getImage',methods=['GET'])
def getImage():
    data= request.get_json()
    response=handleGetImage(data,image_cl)
    return response

@app.route('/api/getUserImageList',methods=['GET'])
def getImageList():
    user_id=session["user"]["email"]
    response=handleGetImageList(image_cl,user_id)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)