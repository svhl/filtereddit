from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load your model (make sure model.pkl is in the same folder)
model = joblib.load('model.pkl')

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
	app.run(debug=True)
