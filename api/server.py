from flask import Flask, jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)


@app.route("/getqestions/<text>")
def hello_world(text):
    res = requests.get(f'https://43a3-35-196-33-35.ngrok-free.app/getqestions/{text}')
    return jsonify(res.text)



if __name__ == '__main__':
    app.run(debug=True, port=5000)
