from flask import Flask, render_template
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

def handle_get_request():
    return {"message": "Hello from Flask!"}

def handle_post_request(data):
    return {"received": data, "message": "Data received successfully!"}

@app.route('/')
def home():
    return render_template()

if __name__ == '__main__':
    app.run(debug=True)