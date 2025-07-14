from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

# Load your model (make sure model.pkl is in the same folder)
model = joblib.load('model.pkl')

@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/classify', methods=['POST'])
def classify():
	data = request.json
	texts = data.get('texts', [])
	predictions = model.predict(texts)
	return jsonify({'predictions': predictions.tolist()})

@app.route('/predict', methods=['POST'])
def predict():
	titles = request.json.get('titles', [])
	predictions = model.predict(titles)
	return jsonify({'categories': predictions.tolist()})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
