from flask import Flask, jsonify, request, session
from flask_cors import CORS
import traceback
from pymongo import MongoClient
from controllers import *
import base64
from keras.models import load_model
ml_model = load_model('MLmodel/model.h5')
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
        # print("thisis debug",request.files)
        # print("thisis debug",request.form)
        if "image" not in request.files:
            return jsonify({"success":False,"message":"No image provided"}),400

        image=request.files["image"]
        filename=request.form.get("filename")
        content_type=request.form.get("content_type")
        userid=request.form.get("userId")
        response=handleSetImage(image,filename,content_type,image_cl,userid)
        
        return response
    except Exception as e:
        print("Error:", e)
        traceback.print_exc()  # Print stack trace to the console for debugging
        return jsonify({"success": False, "message": f"Server Error : {e}"}), 500


@app.route('/api/getImage',methods=['GET'])
def getImage():
    data= request.get_json()
    
    response=handleGetImage(data,image_cl)
    return response

@app.route('/api/getUserImageList',methods=['GET'])
def getImageList():
    user_id=request.headers.get("userid")
    if not user_id:
        return jsonify({"success": False, "message": "User ID not provided"}), 400
    response=handleGetImageList(image_cl,user_id)
    return (response)

@app.route("/api/analyze",methods=["GET"])
def analyzeImage():
    data=request.get_json()
    imageid=data.get("image_id")
    wantEmail=data.get("wantEmail")
    if wantEmail:
        email=data.get("email")
    req={"imageid":imageid,"wantEmail":wantEmail,"email":email or None}
    image=image_cl.find_one({"_id":imageid})
    if image:
        image=base64.b64decode(image)
        result=ml_model.predict(image)
        if result:
            print(f'Image analyzed: {result}')
            return jsonify({"Request":req,"Success:":True,"Result":result})
        else:
            print("Could not analyze the image")
            return jsonify({"Request":req,f"Success":False,"Message":"Could not analyze"})
    else:
        print("Image not found")
    return jsonify({"Request":req,f"Success":False,"Message":"Something went wrong"})

if __name__ == '__main__':
    app.run(debug=True)