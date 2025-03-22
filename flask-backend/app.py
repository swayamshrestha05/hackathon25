# app.py
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load pre-trained model for emotion classification
model = pipeline('text-classification', model='j-hartmann/emotion-english-distilroberta-base')

@app.route('/predict', methods=['POST'])
def predict():
    # Get text from the request
    data = request.json
    text = data['text']

    # Analyze emotion
    result = model(text, return_all_scores=True)

    # Sort results in descending order by score
    sorted_result = sorted(result[0], key=lambda x: x['score'], reverse=True)

    # Filter results: keep top 1, and include 2nd and 3rd only if their score is > 25%
    filtered_result = [sorted_result[0]]  # Always include the top result
    for i in range(1, 3):  # Check the 2nd and 3rd results
        if i < len(sorted_result) and sorted_result[i]['score'] > 0.25:
            filtered_result.append(sorted_result[i])

    # Return the filtered result as JSON
    return jsonify(filtered_result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Run the API