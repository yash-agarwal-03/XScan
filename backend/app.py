from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from controllers import *

app=Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
user_cl = db["users"]

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    response=handle_login(data,user_cl)
    return jsonify(response)

@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    response=handle_register(data,user_cl)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)