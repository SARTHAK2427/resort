# EcoRewards Flask Backend

This is the Flask backend for the EcoRewards waste classification platform, integrating a TensorFlow-based AI model for waste classification.

## Features

- **Waste Classification**: AI-powered waste classification using MobileNetV2
- **Object Detection**: Simple contour-based object counting
- **RESTful API**: Clean API endpoints for frontend integration
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Robust error handling and fallback mechanisms

## Model Information

- **Architecture**: MobileNetV2 with custom classification head
- **Input Size**: 224x224x3 (RGB images)
- **Classes**: 5 waste categories
  - Biodegradable
  - Non Biodegradable
  - Ewaste
  - Pharmaceutical and Biomedical Waste
  - Hazardous

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Model Setup

Place your trained model file in the `models/` directory:
```
backend/
├── models/
│   └── garbage_tf_model.h5  # Your trained model
├── app.py
├── requirements.txt
└── README.md
```

### 3. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/classify
Classify a waste image and return classification results.

**Request Body:**
```json
{
  "image": "base64_encoded_image_string"
}
```

**Response:**
```json
{
  "success": true,
  "classification": {
    "predicted_class": "Plastic Bottle",
    "waste_type": "plastic",
    "confidence": 0.95,
    "points": 14,
    "object_count": 1
  }
}
```

### GET /api/health
Check backend health and model status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "available_classes": ["Biodegradable", "Non Biodegradable", "Ewaste", "Pharmaceutical and Biomedical Waste", "hazardous"]
}
```

### GET /api/info
Get model information.

**Response:**
```json
{
  "model_name": "Garbage Classification Model",
  "classes": ["Biodegradable", "Non Biodegradable", "Ewaste", "Pharmaceutical and Biomedical Waste", "hazardous"],
  "input_shape": [224, 224, 3],
  "description": "MobileNetV2-based waste classification model"
}
```

## Points System

The backend calculates points based on waste type and AI confidence:

- **Organic**: 10 points
- **Plastic**: 15 points
- **E-Waste**: 25 points
- **Hazardous**: 30 points
- **Other**: 5 points

Final points = Base points × AI confidence

## Error Handling

The backend includes comprehensive error handling:

- Invalid image data
- Model loading failures
- Classification errors
- Network issues

If the backend is unavailable, the frontend will fall back to simulation mode.

## Development

### Adding New Waste Types

1. Update the `CLASS_NAMES` list in `app.py`
2. Add mapping in `waste_type_mapping`
3. Update points calculation in `base_points`
4. Retrain the model with new classes

### Model Training

Use the provided training script to train or retrain the model:

```python
# Training script (from your provided code)
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import models, layers, optimizers
# ... (rest of your training code)
```

## Troubleshooting

### Common Issues

1. **Model not loading**: Check if `garbage_tf_model.h5` exists in `models/` directory
2. **CORS errors**: Ensure Flask-CORS is properly installed
3. **Memory issues**: Reduce batch size or image resolution
4. **Port conflicts**: Change port in `app.py` if 5000 is occupied

### Logs

The server provides detailed logging for debugging:
- Model loading status
- Classification requests
- Error messages
- Performance metrics

## Production Deployment

For production deployment:

1. Use Gunicorn as WSGI server
2. Set up proper environment variables
3. Configure reverse proxy (nginx)
4. Enable HTTPS
5. Set up monitoring and logging

```bash
# Production command
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Security Considerations

- Input validation for image data
- Rate limiting for API endpoints
- Secure model file storage
- Environment variable configuration
- Regular security updates

## Contributing

1. Follow PEP 8 style guidelines
2. Add proper error handling
3. Include docstrings for functions
4. Test API endpoints thoroughly
5. Update documentation

## License

This project is part of the EcoRewards platform.
