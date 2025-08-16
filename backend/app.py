from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import base64
from PIL import Image
import io
import tempfile

app = Flask(__name__)
CORS(app)

# Load the model
try:
    model = load_model("backend/models/garbage_tf_model.h5")
    CLASS_NAMES = ["Biodegradable", "Non Biodegradable", "Ewaste", "Pharmaceutical and Biomedical Waste", "hazardous"]
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    CLASS_NAMES = ["Biodegradable", "Non Biodegradable", "Ewaste", "Pharmaceutical and Biomedical Waste", "hazardous"]

def classify_image(img_array):
    """Classify waste from image array"""
    if model is None:
        return "Model not loaded", 0.0
    
    try:
        # Preprocess image
        x = cv2.resize(img_array, (224, 224)) / 255.0
        pred = model.predict(np.expand_dims(x, 0))[0]
        idx = np.argmax(pred)
        predicted_class = CLASS_NAMES[idx]
        confidence = float(pred[idx])
        
        return predicted_class, confidence
    except Exception as e:
        print(f"Classification error: {e}")
        return "Error in classification", 0.0

def detect_objects(img_array):
    """Detect and count objects in image"""
    try:
        gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
        
        # Simple threshold + contours
        _, th = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        cnts, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        count = 0
        for c in cnts:
            x, y, w, h = cv2.boundingRect(c)
            if w * h < 500:  # Filter small objects
                continue
            count += 1
        
        return count
    except Exception as e:
        print(f"Object detection error: {e}")
        return 0

def base64_to_image(base64_string):
    """Convert base64 string to image array"""
    try:
        # Remove data URL prefix if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        # Decode base64
        image_data = base64.b64decode(base64_string)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to OpenCV format (BGR)
        img_array = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        return img_array
    except Exception as e:
        print(f"Base64 conversion error: {e}")
        return None

@app.route('/api/classify', methods=['POST'])
def classify_waste():
    """Endpoint for waste classification"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Convert base64 to image
        img_array = base64_to_image(data['image'])
        if img_array is None:
            return jsonify({'error': 'Invalid image data'}), 400
        
        # Classify the image
        predicted_class, confidence = classify_image(img_array)
        
        # Map classification to waste types and points
        waste_type_mapping = {
            "Biodegradable": "organic",
            "Non Biodegradable": "plastic", 
            "Ewaste": "e-waste",
            "Pharmaceutical and Biomedical Waste": "hazardous",
            "hazardous": "hazardous"
        }
        
        waste_type = waste_type_mapping.get(predicted_class, "other")
        
        # Calculate points based on confidence and waste type
        base_points = {
            "organic": 10,
            "plastic": 15,
            "e-waste": 25,
            "hazardous": 30,
            "other": 5
        }
        
        points = int(base_points.get(waste_type, 5) * confidence)
        
        # Detect objects
        object_count = detect_objects(img_array)
        
        return jsonify({
            'success': True,
            'classification': {
                'predicted_class': predicted_class,
                'waste_type': waste_type,
                'confidence': confidence,
                'points': points,
                'object_count': object_count
            }
        })
        
    except Exception as e:
        print(f"Classification endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'available_classes': CLASS_NAMES
    })

@app.route('/api/info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        'model_name': 'Garbage Classification Model',
        'classes': CLASS_NAMES,
        'input_shape': (224, 224, 3),
        'description': 'MobileNetV2-based waste classification model'
    })

if __name__ == '__main__':
    # Create models directory if it doesn't exist
    os.makedirs('backend/models', exist_ok=True)
    
    print("Starting Flask server...")
    print("Available endpoints:")
    print("- POST /api/classify - Classify waste image")
    print("- GET /api/health - Health check")
    print("- GET /api/info - Model information")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
