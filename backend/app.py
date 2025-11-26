from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app)

model = joblib.load('model.pkl')

# Serve index.html
@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.static_folder, 'index.html')

# Serve all other static files
@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Predict category
@app.route('/predict', methods=['POST'])
def predict():
	titles = request.json.get('titles', [])
	predictions = model.predict(titles)
	return jsonify({'categories': predictions.tolist()})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
